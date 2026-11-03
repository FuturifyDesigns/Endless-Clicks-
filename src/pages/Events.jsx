import { useRef } from 'react'
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
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      })
      gsap.from('.event-card', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.15,
        ease: 'power2.out',
      })
    },
    { scope: root, dependencies: [loading, events.length] },
  )

  return (
    <div ref={root} className="page">
      <header className="page-hero">
        <p className="eyebrow">Events</p>
        <h1>The queue is live</h1>
        <p>
          Upcoming nights show a countdown. When an event goes live, the site flips status.
          When it ends, the next published event takes over automatically.
        </p>
      </header>

      {loading && <p className="muted">Pulling the lineup...</p>}
      {error && <p className="form-alert form-alert--error">{error}</p>}

      {live.length > 0 && (
        <section className="section">
          <h2 className="section-title">Happening now</h2>
          <div className="event-grid">
            {live.map((event) => (
              <EventCard key={event.id} event={event} stat={stats[event.id]} now={now} />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h2 className="section-title">Upcoming</h2>
        {upcoming.length === 0 && !loading ? (
          <p className="muted">No upcoming events yet — check back soon.</p>
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
          <h2 className="section-title">Recently wrapped</h2>
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
