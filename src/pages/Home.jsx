import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Countdown from '../components/Countdown'
import EventCard from '../components/EventCard'
import AttendanceMeter from '../components/AttendanceMeter'
import LiveBadge from '../components/LiveBadge'
import InteractiveCard from '../components/InteractiveCard'
import { useEvents } from '../hooks/useEvents'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { formatEventDate, getEventStatus } from '../lib/events'
import { enter, enterStagger } from '../lib/motion'
import logo from '../assets/logo-transparent.png'
import heroLive from '../assets/photos/hero-live.jpg'
import workflowDiscover from '../assets/photos/workflow-discover.jpg'
import workflowPlan from '../assets/photos/workflow-plan.jpg'
import workflowPromo from '../assets/photos/workflow-promo.jpg'
import checkin from '../assets/photos/checkin.jpg'

gsap.registerPlugin(useGSAP)

export default function Home() {
  const root = useRef(null)
  const { events, stats, featured, loading, error, now } = useEvents()
  const status = featured ? getEventStatus(featured, now) : null
  const featuredStat = featured ? stats[featured.id] : null

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero__copy > *', { ...enterStagger })
        gsap.from('.hero__visual, .featured-panel', { ...enter, delay: 0.08 })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [loading, featured?.id] },
  )

  useScrollReveal(root, '.reveal-card', [events.length, loading])

  return (
    <div ref={root}>
      <section className="hero hero--tight">
        <div className="hero__grid">
          <div className="hero__copy">
            <img className="hero__brand" src={logo} alt="Endless Clicks" />
            <p className="eyebrow hero__kicker">Gaborone, Botswana</p>
            <h1>Discover Endless Clicks events — and confirm you are going.</h1>
            <p className="lead">
              The official board for upcoming Endless Clicks events. Browse what’s next,
              follow the countdown, and register so we know you are coming.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to={featured ? `/events/${featured.slug}` : '/events'}>
                {featured ? 'Register for this event' : 'Browse events'}
              </Link>
              <Link className="btn btn--ghost" to="/about">
                About Endless Clicks
              </Link>
            </div>
            <div className="hero__meta">
              <div>
                <strong>Upcoming</strong>
                <span>See what’s next</span>
              </div>
              <div>
                <strong>Live</strong>
                <span>Know what’s on</span>
              </div>
              <div>
                <strong>Register</strong>
                <span>Say you are coming</span>
              </div>
            </div>
          </div>

          <div className="hero__stage">
            <div className="hero__visual">
              <img src={heroLive} alt="Guests at an Endless Clicks event" />
            </div>
            {loading && (
              <div className="featured-panel">
                <p className="muted">Loading featured event…</p>
              </div>
            )}
            {error && <p className="form-alert form-alert--error">{error}</p>}
            {!loading && featured && (
              <div className="featured-panel">
                <div className="featured-panel__top">
                  <LiveBadge status={status} />
                  <p className="featured-panel__kicker">Featured event</p>
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
                  label={status === 'ended' ? 'Event ended' : 'Starts in'}
                />
                <AttendanceMeter
                  registrationCount={featuredStat?.registration_count || 0}
                  guestCount={featuredStat?.guest_count || 0}
                  capacity={featured.capacity}
                />
                <Link className="btn btn--secondary" to={`/events/${featured.slug}`}>
                  View details & register
                </Link>
              </div>
            )}
            {!loading && !featured && (
              <div className="featured-panel">
                <p className="eyebrow">Coming up</p>
                <h2>New Endless Clicks dates soon</h2>
                <p>
                  Fresh events will appear here with countdown, venue details, and registration.
                </p>
                <Link className="btn btn--primary" to="/contact">
                  Contact us
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="band-soft">
        <div className="section section--tight">
          <div className="section__head reveal-card">
            <p className="eyebrow">What you will find</p>
            <h2>Everything you need before you show up.</h2>
          </div>
          <div className="services-grid">
            <InteractiveCard
              eyebrow="01"
              title="Event details"
              summary="Date, venue, and what the night is about."
              detail="Each listing helps you decide quickly and arrive prepared."
              image={workflowDiscover}
              imageAlt="Team reviewing event plans"
            />
            <InteractiveCard
              eyebrow="02"
              title="Live status"
              summary="Countdowns for upcoming events, live when it starts."
              detail="When one event ends, the next Endless Clicks listing takes focus."
              image={workflowPlan}
              imageAlt="Event planning on site"
            />
            <InteractiveCard
              eyebrow="03"
              title="Easy registration"
              summary="Confirm you are coming with your details."
              detail="Live attendance counts update as guests register."
              image={workflowPromo}
              imageAlt="Creative team preparing event promotion"
            />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="split split--wide">
          <div className="media-frame reveal-card">
            <img src={checkin} alt="Guests checking in" />
          </div>
          <div className="reveal-card">
            <p className="eyebrow">How it works</p>
            <h2>Browse. Register. Arrive ready.</h2>
            <p>
              Open an event page, read the essentials, then confirm your attendance —
              clear information from Endless Clicks, nothing extra.
            </p>
            <ul className="list-check">
              <li>See upcoming and live Endless Clicks events</li>
              <li>Register so we expect you</li>
              <li>Watch live “going” counts</li>
            </ul>
            <Link className="btn btn--ghost" to="/events">
              Go to events
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="section__head reveal-card">
          <p className="eyebrow">Lineup</p>
          <h2>Upcoming & live events</h2>
        </div>
        {events.length > 0 ? (
          <>
            <div className="event-grid">
              {events.slice(0, 3).map((event) => (
                <div className="reveal-card" key={event.id}>
                  <EventCard event={event} stat={stats[event.id]} now={now} />
                </div>
              ))}
            </div>
            <div className="section__cta reveal-card">
              <Link className="btn btn--ghost" to="/events">
                See all events
              </Link>
            </div>
          </>
        ) : (
          <div className="empty-state reveal-card">
            <h3>New dates coming soon</h3>
            <p className="muted">
              Endless Clicks is preparing the next listings. Check back shortly or contact us.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Contact us
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
