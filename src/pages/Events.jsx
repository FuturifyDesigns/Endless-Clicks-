import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import EventCard from '../components/EventCard'
import { useEvents } from '../hooks/useEvents'
import { getEventStatus } from '../lib/events'

gsap.registerPlugin(useGSAP)

export default function Events() {
  const root = useRef(null)
  const { events, stats, loading, error, now } = useEvents()

  const live = events.filter((e) => getEventStatus(e, now) === 'live')
  const upcoming = events.filter((e) => getEventStatus(e, now) === 'upcoming')
  const past = events.filter((e) => getEventStatus(e, now) === 'ended')

  useGSAP(
    () => {
      gsap.from('.page-hero > *', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power2.out',
      })
      gsap.from('.event-card, .empty-state, .info-card', {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        delay: 0.1,
        ease: 'power2.out',
      })
    },
    { scope: root, dependencies: [loading, events.length] },
  )

  return (
    <div ref={root} className="page">
      <header className="page-hero">
        <p className="eyebrow">Events</p>
        <h1>Event board</h1>
        <p className="lead">
          Browse upcoming and live programmes from Endless Clicks. Each event page includes
          schedule details, venue information, a countdown or live status, and a registration
          form so guests can confirm they are attending.
        </p>
      </header>

      <section className="band-soft" style={{ marginBottom: '2rem' }}>
        <div className="section" style={{ paddingTop: '1.6rem', paddingBottom: '1.6rem' }}>
          <div className="info-grid">
            <article className="info-card">
              <h3>Upcoming</h3>
              <p>Shows a countdown to start time so guests know exactly when doors open.</p>
            </article>
            <article className="info-card">
              <h3>Live</h3>
              <p>During the event window, status switches to “Event is live”.</p>
            </article>
            <article className="info-card">
              <h3>Next in queue</h3>
              <p>When one event ends, the next published event becomes featured automatically.</p>
            </article>
            <article className="info-card">
              <h3>Register</h3>
              <p>Guests submit name and key details. Live counts update on the public pages.</p>
            </article>
          </div>
        </div>
      </section>

      {loading && <p className="muted">Loading events…</p>}
      {error && <p className="form-alert form-alert--error">{error}</p>}

      {live.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <h2 className="section-title">Happening now</h2>
          <div className="event-grid">
            {live.map((event) => (
              <EventCard key={event.id} event={event} stat={stats[event.id]} now={now} />
            ))}
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: live.length ? undefined : 0 }}>
        <h2 className="section-title">Upcoming</h2>
        {upcoming.length === 0 && !loading ? (
          <div className="empty-state">
            <h3>No upcoming events published</h3>
            <p className="muted">
              New events will appear here once they are added and published in Admin.
              If you are planning a programme and need hosting, planning, or advertising
              support, contact the Endless Clicks team.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Enquire about an event
            </Link>
          </div>
        ) : (
          <div className="event-grid">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} stat={stats[event.id]} now={now} />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="section">
          <h2 className="section-title">Recently completed</h2>
          <div className="event-grid">
            {past.map((event) => (
              <EventCard key={event.id} event={event} stat={stats[event.id]} now={now} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
