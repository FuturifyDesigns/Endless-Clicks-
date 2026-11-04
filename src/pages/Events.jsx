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
        <h1>Endless Clicks events</h1>
        <p className="lead">
          Browse upcoming and live events posted by Endless Clicks in Gaborone. Open a
          listing for details, follow the countdown, and register that you are coming.
        </p>
      </header>

      <section className="band-soft" style={{ marginBottom: '2rem' }}>
        <div className="section" style={{ paddingTop: '1.6rem', paddingBottom: '1.6rem' }}>
          <div className="services-grid">
            <InteractiveCard
              eyebrow="Guest tip"
              title="Before the night"
              summary="Read the date, venue, and description so you know exactly what to expect."
              detail="Every Endless Clicks listing is written to help you decide and prepare with confidence."
              image={venue}
              imageAlt="Event venue seating"
            />
            <InteractiveCard
              eyebrow="Guest tip"
              title="Register your spot"
              summary="Confirm attendance with your name and contact details."
              detail="Live counts update as guests register, so you can see interest building."
              image={checkin}
              imageAlt="Event check-in"
            />
            <InteractiveCard
              eyebrow="Guest tip"
              title="When it is live"
              summary="Live events are marked clearly while the programme is underway."
              detail="After an event ends, the next Endless Clicks listing moves forward on the board."
              image={heroLive}
              imageAlt="Live event audience"
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
            <h3>New Endless Clicks dates soon</h3>
            <p className="muted">
              Fresh listings will appear here when they are ready. For questions about a
              coming event, contact the team in Gaborone.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Contact us
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
