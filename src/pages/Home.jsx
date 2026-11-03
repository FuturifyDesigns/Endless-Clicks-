import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Countdown from '../components/Countdown'
import EventCard from '../components/EventCard'
import AttendanceMeter from '../components/AttendanceMeter'
import LiveBadge from '../components/LiveBadge'
import { useEvents } from '../hooks/useEvents'
import { formatEventDate, getEventStatus } from '../lib/events'
import logoDark from '../assets/logo-dark.png'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Home() {
  const root = useRef(null)
  const { events, stats, featured, loading, error, now } = useEvents()
  const status = featured ? getEventStatus(featured, now) : null
  const featuredStat = featured ? stats[featured.id] : null

  useGSAP(
    () => {
      gsap.from('.hero__brand', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' })
      gsap.from('.hero__copy > *', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.15,
        ease: 'power3.out',
      })
      gsap.from('.hero__stage', {
        x: 40,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.out',
      })
      gsap.to('.hero__orbit', {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: 'none',
      })
      gsap.from('.reveal', {
        scrollTrigger: { trigger: '.reveal', start: 'top 85%', toggleActions: 'play none none none' },
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      })
    },
    { scope: root, dependencies: [loading, featured?.id] },
  )

  return (
    <div ref={root}>
      <section className="hero">
        <div className="hero__atmosphere" aria-hidden="true">
          <span className="hero__orbit" />
          <span className="hero__beam" />
        </div>

        <div className="hero__grid">
          <div className="hero__copy">
            <img className="hero__brand" src={logoDark} alt="Endless Clicks" />
            <h1>Events that keep people clicking back.</h1>
            <p>
              Endless Clicks Pty Ltd hosts, plans, and advertises nights worth
              showing up for. Watch the countdown, claim your spot, and join the live count.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to={featured ? `/events/${featured.slug}` : '/events'}>
                {status === 'live' ? 'Event is live — register vibe' : 'Register for next event'}
              </Link>
              <Link className="btn btn--ghost" to="/events">
                Browse lineup
              </Link>
            </div>
          </div>

          <div className="hero__stage">
            {loading && <p className="muted">Loading the next moment...</p>}
            {error && <p className="form-alert form-alert--error">{error}</p>}
            {!loading && featured && (
              <div className="featured-panel">
                <div className="featured-panel__top">
                  <LiveBadge status={status} />
                  <p className="featured-panel__kicker">Now featuring</p>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.summary}</p>
                <p className="featured-panel__meta">
                  {formatEventDate(featured.start_at)}
                  <br />
                  {featured.venue} · {featured.location}
                </p>
                <Countdown
                  targetIso={featured.start_at}
                  live={status === 'live'}
                  label={status === 'ended' ? 'Event ended' : 'Countdown to doors'}
                />
                {status === 'ended' && (
                  <p className="muted">Rolling to the next published event automatically.</p>
                )}
                <AttendanceMeter
                  registrationCount={featuredStat?.registration_count || 0}
                  guestCount={featuredStat?.guest_count || 0}
                  capacity={featured.capacity}
                />
                <Link className="btn btn--primary" to={`/events/${featured.slug}`}>
                  I&apos;m going
                </Link>
              </div>
            )}
            {!loading && !featured && (
              <div className="featured-panel">
                <h2>New events loading in</h2>
                <p>Admin can pile up events anytime — the site will feature the next live or upcoming night.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal">
          <p className="eyebrow">Lineup</p>
          <h2>Upcoming & live nights</h2>
          <p>Every published event queues into the system. When one ends, the next countdown takes the stage.</p>
        </div>
        <div className="event-grid">
          {events.slice(0, 3).map((event) => (
            <div className="reveal" key={event.id}>
              <EventCard event={event} stat={stats[event.id]} now={now} />
            </div>
          ))}
        </div>
        <div className="section__cta reveal">
          <Link className="btn btn--ghost" to="/events">
            See all events
          </Link>
        </div>
      </section>

      <section className="section section--split">
        <div className="split-card reveal">
          <p className="eyebrow">What we do</p>
          <h2>Host. Plan. Advertise.</h2>
          <p>
            From concept boards to guest lists, Endless Clicks builds the full
            loop — the story, the stage, and the signal that brings people through the door.
          </p>
          <Link className="btn btn--primary" to="/about">
            About the company
          </Link>
        </div>
        <div className="split-card split-card--accent reveal">
          <p className="eyebrow">Live energy</p>
          <h2>Watch the room fill in real time.</h2>
          <p>
            Registration counts update as guests say they&apos;re coming. Perfect
            for FOMO, sponsors, and proving the night is heating up.
          </p>
        </div>
      </section>
    </div>
  )
}
