import { Link } from 'react-router-dom'
import LiveBadge from './LiveBadge'
import AttendanceMeter from './AttendanceMeter'
import { formatShortDate, getEventStatus } from '../lib/events'

export default function EventCard({ event, stat, now }) {
  const status = getEventStatus(event, now)
  const registrationCount = stat?.registration_count || 0
  const guestCount = stat?.guest_count || 0

  return (
    <article className="event-card">
      <div className="event-card__media">
        <div className="event-card__glow" />
        <LiveBadge status={status} />
      </div>
      <div className="event-card__body">
        <p className="event-card__date">{formatShortDate(event.start_at)}</p>
        <h3>{event.title}</h3>
        <p className="event-card__summary">{event.summary}</p>
        <p className="event-card__venue">
          {event.venue}
          {event.location ? ` · ${event.location}` : ''}
        </p>
        <AttendanceMeter
          registrationCount={registrationCount}
          guestCount={guestCount}
          capacity={event.capacity}
        />
        <Link className="btn btn--ghost" to={`/events/${event.slug}`}>
          {status === 'live' ? 'Join the energy' : 'View & register'}
        </Link>
      </div>
    </article>
  )
}
