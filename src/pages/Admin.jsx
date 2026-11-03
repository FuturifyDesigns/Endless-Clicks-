import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { formatEventDate, slugify } from '../lib/events'

const emptyEvent = {
  title: '',
  summary: '',
  description: '',
  location: '',
  venue: '',
  start_at: '',
  end_at: '',
  capacity: 100,
  is_published: true,
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(null)

  const [events, setEvents] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [selectedEventId, setSelectedEventId] = useState('all')
  const [form, setForm] = useState(emptyEvent)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const loadAdminData = useCallback(async () => {
    const [{ data: eventRows, error: eventError }, { data: regRows, error: regError }] =
      await Promise.all([
        supabase.from('events').select('*').order('start_at', { ascending: true }),
        supabase
          .from('registrations')
          .select('*, events(title)')
          .order('created_at', { ascending: false }),
      ])
    if (eventError) throw eventError
    if (regError) throw regError
    setEvents(eventRows || [])
    setRegistrations(regRows || [])
  }, [])

  useEffect(() => {
    if (!session) return
    loadAdminData().catch((err) => setError(err.message))

    const channel = supabase
      .channel('admin-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, () => {
        loadAdminData().catch(() => {})
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
        loadAdminData().catch(() => {})
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [session, loadAdminData])

  const filteredRegs = useMemo(() => {
    if (selectedEventId === 'all') return registrations
    return registrations.filter((r) => r.event_id === selectedEventId)
  }, [registrations, selectedEventId])

  async function handleLogin(e) {
    e.preventDefault()
    setAuthError(null)
    const { error: signError } = await supabase.auth.signInWithPassword({ email, password })
    if (signError) setAuthError(signError.message)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  function updateForm(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleCreateEvent(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)

    const payload = {
      title: form.title.trim(),
      slug: slugify(form.title),
      summary: form.summary.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      venue: form.venue.trim(),
      start_at: new Date(form.start_at).toISOString(),
      end_at: new Date(form.end_at).toISOString(),
      capacity: Number(form.capacity) || null,
      is_published: Boolean(form.is_published),
    }

    const { error: insertError } = await supabase.from('events').insert(payload)
    setSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setForm(emptyEvent)
    setMessage('Event added to the queue.')
    await loadAdminData()
  }

  async function togglePublish(event) {
    const { error: updateError } = await supabase
      .from('events')
      .update({ is_published: !event.is_published })
      .eq('id', event.id)
    if (updateError) {
      setError(updateError.message)
      return
    }
    await loadAdminData()
  }

  async function removeEvent(event) {
    if (!window.confirm(`Delete "${event.title}" and its registrations?`)) return
    const { error: deleteError } = await supabase.from('events').delete().eq('id', event.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    await loadAdminData()
  }

  function exportCsv() {
    const rows = [
      ['full_name', 'email', 'phone', 'company', 'guests', 'event', 'created_at', 'notes'],
      ...filteredRegs.map((r) => [
        r.full_name,
        r.email,
        r.phone || '',
        r.company || '',
        r.guests,
        r.events?.title || '',
        r.created_at,
        (r.notes || '').replace(/\n/g, ' '),
      ]),
    ]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'endless-clicks-registrations.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (authLoading) {
    return (
      <div className="page">
        <p className="muted">Checking admin session...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="page admin-login">
        <form className="register-form admin-login__card" onSubmit={handleLogin}>
          <p className="eyebrow">Admin</p>
          <h1>Endless Clicks control</h1>
          <p className="muted">Sign in to manage events and view guest lists.</p>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@endlessclicks.co.za"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {authError && <p className="form-alert form-alert--error">{authError}</p>}
          <button className="btn btn--primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="page admin">
      <header className="admin__head">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Event control room</h1>
          <p className="muted">Signed in as {session.user.email}</p>
        </div>
        <button className="btn btn--ghost" type="button" onClick={handleLogout}>
          Sign out
        </button>
      </header>

      {error && <p className="form-alert form-alert--error">{error}</p>}
      {message && <p className="form-alert form-alert--ok">{message}</p>}

      <section className="admin-stats">
        <div className="stat-pill">
          <strong>{events.length}</strong>
          <span>Events queued</span>
        </div>
        <div className="stat-pill">
          <strong>{registrations.length}</strong>
          <span>Registrations</span>
        </div>
        <div className="stat-pill">
          <strong>{registrations.reduce((sum, r) => sum + (r.guests || 0), 0)}</strong>
          <span>Total guests</span>
        </div>
      </section>

      <div className="admin-layout">
        <section className="detail-panel">
          <h2>Add event</h2>
          <p className="muted">Pile events into the queue. The public site features the next live/upcoming one.</p>
          <form className="register-form" onSubmit={handleCreateEvent}>
            <div className="register-form__grid">
              <label className="register-form__full">
                Title
                <input required value={form.title} onChange={(e) => updateForm('title', e.target.value)} />
              </label>
              <label className="register-form__full">
                Summary
                <input required value={form.summary} onChange={(e) => updateForm('summary', e.target.value)} />
              </label>
              <label className="register-form__full">
                Description
                <textarea
                  required
                  rows="4"
                  value={form.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                />
              </label>
              <label>
                Venue
                <input required value={form.venue} onChange={(e) => updateForm('venue', e.target.value)} />
              </label>
              <label>
                Location
                <input required value={form.location} onChange={(e) => updateForm('location', e.target.value)} />
              </label>
              <label>
                Starts
                <input
                  required
                  type="datetime-local"
                  value={form.start_at}
                  onChange={(e) => updateForm('start_at', e.target.value)}
                />
              </label>
              <label>
                Ends
                <input
                  required
                  type="datetime-local"
                  value={form.end_at}
                  onChange={(e) => updateForm('end_at', e.target.value)}
                />
              </label>
              <label>
                Capacity
                <input
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={(e) => updateForm('capacity', e.target.value)}
                />
              </label>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => updateForm('is_published', e.target.checked)}
                />
                Published on website
              </label>
            </div>
            <button className="btn btn--primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Add to queue'}
            </button>
          </form>
        </section>

        <section className="detail-panel">
          <h2>Queued events</h2>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Start</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <strong>{event.title}</strong>
                      <div className="muted">{event.venue}</div>
                    </td>
                    <td>{formatEventDate(event.start_at)}</td>
                    <td>{event.is_published ? 'Published' : 'Hidden'}</td>
                    <td className="admin-table__actions">
                      <button className="btn btn--ghost btn--sm" type="button" onClick={() => togglePublish(event)}>
                        {event.is_published ? 'Hide' : 'Publish'}
                      </button>
                      <button className="btn btn--ghost btn--sm" type="button" onClick={() => removeEvent(event)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="detail-panel admin-regs">
        <div className="admin-regs__head">
          <div>
            <h2>Registered guests</h2>
            <p className="muted">Live list of people who indicated they are going.</p>
          </div>
          <div className="admin-regs__tools">
            <select value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
              <option value="all">All events</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
            <button className="btn btn--ghost btn--sm" type="button" onClick={exportCsv}>
              Export CSV
            </button>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Guests</th>
                <th>Event</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegs.map((reg) => (
                <tr key={reg.id}>
                  <td>{reg.full_name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone || '—'}</td>
                  <td>{reg.guests}</td>
                  <td>{reg.events?.title || '—'}</td>
                  <td>{formatEventDate(reg.created_at)}</td>
                </tr>
              ))}
              {filteredRegs.length === 0 && (
                <tr>
                  <td colSpan="6" className="muted">
                    No registrations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
