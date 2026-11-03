import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Countdown from '../components/Countdown'
import LiveBadge from '../components/LiveBadge'
import AttendanceMeter from '../components/AttendanceMeter'
import RegisterForm from '../components/RegisterForm'
import { useEvent } from '../hooks/useEvents'
import { formatEventDate, getEventStatus } from '../lib/events'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

gsap.registerPlugin(useGSAP)

export default function EventDetail() {
  const { slug } = useParams()
  const root = useRef(null)
  const { event, stat, loading, error, now } = useEvent(slug)
  const [localStat, setLocalStat] = useState(null)

  const activeStat = localStat || stat
  const status = event ? getEventStatus(event, now) : null
  const closed = status === 'ended'

  useGSAP(
    () => {
      if (!event) return
      gsap.from('.detail-hero > *', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      })
      gsap.from('.detail-panel', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        delay: 0.1,
        ease: 'power2.out',
      })
    },
    { scope: root, dependencies: [event?.id] },
  )

  async function refreshStat() {
    if (!event) return
    const { data } = await supabase
      .from('event_registration_stats')
      .select('*')
      .eq('event_id', event.id)
      .maybeSingle()
    setLocalStat(data)
  }

  if (loading) {
    return (
      <div className="page">
        <p className="muted">Loading event...</p>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="page">
        <p className="form-alert form-alert--error">{error || 'Event not found'}</p>
        <Link className="btn btn--ghost" to="/events">
          Back to events
        </Link>
      </div>
    )
  }

  return (
    <div ref={root} className="page detail">
      <header className="detail-hero">
        <LiveBadge status={status} />
        <p className="eyebrow">Event</p>
        <h1>{event.title}</h1>
        <p className="detail-hero__summary">{event.summary}</p>
        <p className="detail-hero__meta">
          {formatEventDate(event.start_at)} → {formatEventDate(event.end_at)}
          <br />
          {event.venue} · {event.location}
        </p>
      </header>

      <div className="detail-layout">
        <div className="detail-panel">
          <Countdown
            targetIso={event.start_at}
            live={status === 'live'}
            label={status === 'ended' ? 'This event has ended' : 'Countdown'}
          />
          <AttendanceMeter
            registrationCount={activeStat?.registration_count || 0}
            guestCount={activeStat?.guest_count || 0}
            capacity={event.capacity}
          />
          <div className="prose">
            <h2>About the night</h2>
            <p>{event.description}</p>
          </div>
        </div>

        <div className="detail-panel detail-panel--form">
          <h2>Register your spot</h2>
          <p className="muted">
            Tell us you&apos;re coming — your name lands on the guest list and the live count updates.
          </p>
          <RegisterForm eventId={event.id} disabled={closed} onSuccess={refreshStat} />
        </div>
      </div>
    </div>
  )
}
