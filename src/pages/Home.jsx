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
import logoLight from '../assets/logo-light.jpg'
import heroLive from '../assets/photos/hero-live.jpg'
import hosting from '../assets/photos/hosting.jpg'
import venue from '../assets/photos/venue.jpg'
import checkin from '../assets/photos/checkin.jpg'
import planning from '../assets/photos/planning.jpg'

gsap.registerPlugin(useGSAP)

export default function Home() {
  const root = useRef(null)
  const { events, stats, featured, loading, error, now } = useEvents()
  const status = featured ? getEventStatus(featured, now) : null
  const featuredStat = featured ? stats[featured.id] : null

  useGSAP(
    () => {
      gsap.from('.hero__copy > *', { ...enterStagger })
      gsap.from('.hero__visual, .featured-panel', { ...enter, delay: 0.1 })
    },
    { scope: root, dependencies: [loading, featured?.id] },
  )

  useScrollReveal(root, '.reveal-card', [events.length, loading])

  return (
    <div ref={root}>
      <section className="hero">
        <div className="hero__grid">
          <div className="hero__copy">
            <img className="hero__brand" src={logoLight} alt="Endless Clicks" />
            <p className="eyebrow hero__kicker">Gaborone, Botswana</p>
            <h1>Discover Endless Clicks events — and confirm you are going.</h1>
            <p className="lead">
              This is the official board for upcoming Endless Clicks events. Browse what’s
              next in Gaborone, follow the countdown, and register with your details so we
              know you are coming.
            </p>
            <div className="hero__actions">
              <Link
                className="btn btn--primary"
                to={featured ? `/events/${featured.slug}` : '/events'}
              >
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
                <span>Know what’s on now</span>
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
                  Follow along or reach out if you have a question about an upcoming night.
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
        <div className="section">
          <div className="section__head reveal-card">
            <p className="eyebrow">What you will find here</p>
            <h2>Everything you need before you show up.</h2>
            <p>
              Endless Clicks posts its events on this site so guests can explore details,
              watch the countdown, and register attendance in one place.
            </p>
          </div>
          <div className="services-grid">
            <InteractiveCard
              eyebrow="01"
              title="Event details"
              summary="Date, venue, and what the night is about — clearly laid out."
              detail="Each listing helps you decide quickly whether the event is for you and how to prepare."
              image={venue}
              imageAlt="Prepared event venue"
            />
            <InteractiveCard
              eyebrow="02"
              title="Live status"
              summary="Countdowns for upcoming events, and a live marker when the programme starts."
              detail="When one event ends, the next Endless Clicks event moves into focus automatically."
              image={hosting}
              imageAlt="Event space being prepared"
            />
            <InteractiveCard
              eyebrow="03"
              title="Easy registration"
              summary="Confirm you are coming with your name and contact details."
              detail="Live attendance counts update as guests register, so you can see the room filling up."
              image={checkin}
              imageAlt="Guests checking in at an event"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split split--wide">
          <div className="media-frame reveal-card">
            <img src={planning} alt="Endless Clicks event planning materials" />
          </div>
          <div className="reveal-card">
            <p className="eyebrow">How it works</p>
            <h2>Browse. Register. Arrive ready.</h2>
            <p>
              Open an event page, read the essentials, then confirm your attendance. That’s it —
              no complicated steps, just clear information from Endless Clicks.
            </p>
            <ul className="list-check">
              <li>See upcoming and live Endless Clicks events</li>
              <li>Register with your details so we expect you</li>
              <li>Watch live “going” counts as guests confirm</li>
            </ul>
            <Link className="btn btn--ghost" to="/events" style={{ marginTop: '0.5rem' }}>
              Go to events
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="section">
          <div className="split split--wide">
            <div className="reveal-card">
              <p className="eyebrow">Endless Clicks</p>
              <h2>Events posted by us, for people who want to be there.</h2>
              <p>
                This website is the public home for Endless Clicks event listings in Gaborone.
                Discover what’s coming, mark yourself as going, and stay close to the nights
                that matter.
              </p>
            </div>
            <div className="stat-row reveal-card">
              <div className="stat-box">
                <strong>BW</strong>
                <span>Based in Gaborone</span>
              </div>
              <div className="stat-box">
                <strong>Live</strong>
                <span>Status updates</span>
              </div>
              <div className="stat-box">
                <strong>RSVP</strong>
                <span>Confirm attendance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal-card">
          <p className="eyebrow">Lineup</p>
          <h2>Upcoming & live events</h2>
          <p>Register for any open Endless Clicks date and we will look forward to seeing you.</p>
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
              Endless Clicks is preparing the next listings. Check back shortly, or contact
              us if you have a question about an upcoming event.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Contact us
            </Link>
          </div>
        )}
      </section>

      <section className="section">
        <div className="split">
          <div className="reveal-card">
            <p className="eyebrow">Quick answers</p>
            <h2>Common questions</h2>
            <div className="faq">
              <details>
                <summary>What is this website for?</summary>
                <p>
                  It advertises Endless Clicks events and lets guests register that they are
                  attending.
                </p>
              </details>
              <details>
                <summary>Do I need a ticket to register?</summary>
                <p>
                  Many listings use simple RSVP registration so we know who is coming. Each
                  event page will note anything extra you need to know.
                </p>
              </details>
              <details>
                <summary>Where are the events held?</summary>
                <p>
                  Endless Clicks is based in Gaborone, Botswana. Venue details appear on each
                  event page.
                </p>
              </details>
            </div>
          </div>
          <div className="info-card reveal-card">
            <p className="eyebrow">Stay in touch</p>
            <h2>Questions about an event?</h2>
            <p>
              Email the team and we will help with details, accessibility notes, or anything
              else you need before the night.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Contact Endless Clicks
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
