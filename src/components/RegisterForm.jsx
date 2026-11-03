import { useState } from 'react'
import { supabase } from '../lib/supabase'

const empty = {
  full_name: '',
  email: '',
  phone: '',
  company: '',
  guests: 1,
  notes: '',
}

export default function RegisterForm({ eventId, disabled, onSuccess }) {
  const [form, setForm] = useState(empty)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (disabled) return
    setSubmitting(true)
    setError(null)
    setMessage(null)

    const { error: insertError } = await supabase.from('registrations').insert({
      event_id: eventId,
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      company: form.company.trim() || null,
      guests: Number(form.guests) || 1,
      notes: form.notes.trim() || null,
    })

    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setForm(empty)
    setMessage("You're on the list. See you there.")
    onSuccess?.()
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-form__grid">
        <label>
          Full name
          <input
            required
            value={form.full_name}
            onChange={(e) => update('full_name', e.target.value)}
            placeholder="Alex Molefe"
            disabled={disabled || submitting}
          />
        </label>
        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@email.com"
            disabled={disabled || submitting}
          />
        </label>
        <label>
          Phone
          <input
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+27 ..."
            disabled={disabled || submitting}
          />
        </label>
        <label>
          Company / crew
          <input
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Optional"
            disabled={disabled || submitting}
          />
        </label>
        <label>
          Guests (including you)
          <input
            required
            type="number"
            min="1"
            max="20"
            value={form.guests}
            onChange={(e) => update('guests', e.target.value)}
            disabled={disabled || submitting}
          />
        </label>
        <label className="register-form__full">
          Notes
          <textarea
            rows="3"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            placeholder="Accessibility needs, VIP requests, arrival time..."
            disabled={disabled || submitting}
          />
        </label>
      </div>

      {error && <p className="form-alert form-alert--error">{error}</p>}
      {message && <p className="form-alert form-alert--ok">{message}</p>}

      <button className="btn btn--primary" type="submit" disabled={disabled || submitting}>
        {disabled ? 'Registration closed' : submitting ? 'Saving...' : "I'm going — register"}
      </button>
    </form>
  )
}
