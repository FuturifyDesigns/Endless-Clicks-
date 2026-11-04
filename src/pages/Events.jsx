import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import EventCard from '../components/EventCard'
import InteractiveCard from '../components/InteractiveCard'
import { useEvents } from '../hooks/useEvents'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getEventStatus } from '../lib/events'
import { enterStagger } from '../lib/motion'
import venue from '../assets/photos/venue.jpg'
import checkin from '../assets/photos/checkin.jpg'
import heroLive from '../assets/photos/hero-live.jpg'

gsap.registerPlugin(useGSAP)

export default function Events() {
  const root = useRef(null)
  const { events, stats, loading, error, now } = useEvents()

  const live = events.filter((e) => getEventStatus(e, now) === 'live')
  const upcoming = events.filter((e) => getEventStatus(e, now) === 'upcoming')
  const past = events.filter((e) => getEventStatus(e, now) === 'ended')

  useGSAP(
    () => {
      gsap.from('.page-hero > *', { ...enterStagger })
    },
    { scope: root, dependencies: [loading] },
  )

  useScrollReveal(root, '.reveal-card', [events.length, loading])

  return (
    <div ref={root} className="page">
      <header className="page-hero">
        <p className="eyebrow">Events</p>
        <h1>Gatherings worth your evening</h1>
        <p className="lead">
          Explore upcoming and live programmes from Endless Clicks in Gaborone. Each page
          shares the details that matter — then invites you to confirm you are coming.
        </p>
      </header>

      <section className="band-soft" style={{ marginBottom: '2rem' }}>
        <div className="section" style={{ paddingTop: '1.6rem', paddingBottom: '1.6rem' }}>
          <div className="services-grid">
            <InteractiveCard
              eyebrow="Experience"
              title="Before doors"
              summary="Countdowns, venue details, and clear expectations so guests arrive prepared."
              detail="Every listing highlights when and where to show up, plus what the evening is about."
              image={venue}
              imageAlt="Event venue prepared for guests"
            />
            <InteractiveCard
              eyebrow="Experience"
              title="Arrival"
              summary="Smooth check-in and a warm first impression as people step in."
              detail="Registration details help our team welcome the right guests without the chaos."
              image={checkin}
              imageAlt="Event check-in desk"
            />
            <InteractiveCard
              eyebrow="Experience"
              title="In the room"
              summary="Live energy, attentive hosting, and moments that feel considered."
              detail="When an event is underway, status updates to live so everyone knows the programme has begun."
              image={heroLive}
              imageAlt="Audience at a live event"
            />
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
              <div className="reveal-card" key={event.id}>
                <EventCard event={event} stat={stats[event.id]} now={now} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: live.length ? undefined : 0 }}>
        <h2 className="section-title">Upcoming</h2>
        {upcoming.length === 0 && !loading ? (
          <div className="empty-state reveal-card">
            <h3>New dates coming soon</h3>
            <p className="muted">
              Fresh Endless Clicks experiences are being prepared for Gaborone. If you want
              a private or branded event hosted, planned, or promoted, we would love to talk.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Enquire about an event
            </Link>
          </div>
        ) : (
          <div className="event-grid">
            {upcoming.map((event) => (
              <div className="reveal-card" key={event.id}>
                <EventCard event={event} stat={stats[event.id]} now={now} />
              </div>
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section className="section">
          <h2 className="section-title">Recently completed</h2>
          <div className="event-grid">
            {past.map((event) => (
              <div className="reveal-card" key={event.id}>
                <EventCard event={event} stat={stats[event.id]} now={now} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
