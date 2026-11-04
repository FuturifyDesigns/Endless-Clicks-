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
import logoLight from '../assets/logo-light.jpg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Home() {
  const root = useRef(null)
  const { events, stats, featured, loading, error, now } = useEvents()
  const status = featured ? getEventStatus(featured, now) : null
  const featuredStat = featured ? stats[featured.id] : null

  useGSAP(
    () => {
      gsap.from('.hero__copy > *', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      })
      gsap.from('.featured-panel', {
        y: 24,
        opacity: 0,
        duration: 0.75,
        delay: 0.12,
        ease: 'power2.out',
      })
      gsap.from('.reveal', {
        scrollTrigger: { trigger: '.reveal', start: 'top 88%' },
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
      })
    },
    { scope: root, dependencies: [loading, featured?.id] },
  )

  return (
    <div ref={root}>
      <section className="hero">
        <div className="hero__grid">
          <div className="hero__copy">
            <img className="hero__brand" src={logoLight} alt="Endless Clicks" />
            <p className="eyebrow hero__kicker">Event hosting · Planning · Advertising</p>
            <h1>Professional events that people actually show up for.</h1>
            <p className="lead">
              Endless Clicks Pty Ltd helps brands, organisations, and communities host,
              plan, and advertise events with clear timelines, strong guest communication,
              and live registration tracking — from first announcement to closing remarks.
            </p>
            <div className="hero__actions">
              <Link
                className="btn btn--primary"
                to={featured ? `/events/${featured.slug}` : '/contact'}
              >
                {featured ? 'Register for featured event' : 'Book a planning call'}
              </Link>
              <Link className="btn btn--ghost" to="/events">
                Browse events
              </Link>
            </div>
            <div className="hero__meta">
              <div>
                <strong>01</strong>
                <span>Host on the day</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Plan every detail</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Advertise for turnout</span>
              </div>
            </div>
          </div>

          <div className="hero__stage">
            {loading && <div className="featured-panel"><p className="muted">Loading event board…</p></div>}
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
              <div className="featured-panel empty-state">
                <p className="eyebrow">Event board</p>
                <h2>No published events yet</h2>
                <p>
                  When new events are added in Admin, this panel shows the next upcoming
                  or live event with countdown, venue details, and live attendance counts.
                </p>
                <ul className="list-check">
                  <li>Countdown until doors open</li>
                  <li>“Event is live” status during the programme</li>
                  <li>Automatic move to the next queued event when one ends</li>
                </ul>
                <Link className="btn btn--primary" to="/contact">
                  Enquire about hosting
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="band-soft">
        <div className="section">
          <div className="section__head reveal">
            <p className="eyebrow">What we deliver</p>
            <h2>A full-service event partner, not just a flyer.</h2>
            <p>
              Whether you need a polished corporate session, a public showcase, or a
              community gathering, Endless Clicks covers the operational and promotional work
              that turns an idea into an attended event.
            </p>
          </div>
          <div className="services-grid">
            <article className="info-card reveal">
              <p className="info-card__num">Service 01</p>
              <h3>Event hosting</h3>
              <p>
                On-site coordination, guest flow, stage timing, partner activations, and
                host support so the day runs calmly and professionally.
              </p>
            </article>
            <article className="info-card reveal">
              <p className="info-card__num">Service 02</p>
              <h3>Event planning</h3>
              <p>
                Concept development, schedules, vendor coordination, risk checks, run-of-show
                documents, and clear ownership from kickoff to wrap.
              </p>
            </article>
            <article className="info-card reveal">
              <p className="info-card__num">Service 03</p>
              <h3>Event advertising</h3>
              <p>
                Campaign messaging, registration pages, reminders, and live attendance
                signals that convert interest into confirmed guests.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal">
          <p className="eyebrow">How registration works</p>
          <h2>Guests confirm. You see the room fill.</h2>
          <p>
            Every published event can collect guest details — name, contact information,
            company or crew, guest count, and notes — so your team knows who is coming.
          </p>
        </div>
        <div className="info-grid">
          <article className="info-card reveal">
            <p className="info-card__num">Step 01</p>
            <h3>Publish the event</h3>
            <p>Add title, venue, times, capacity, and description from the admin panel.</p>
          </article>
          <article className="info-card reveal">
            <p className="info-card__num">Step 02</p>
            <h3>Share the page</h3>
            <p>Guests open the event page, review details, and register that they are attending.</p>
          </article>
          <article className="info-card reveal">
            <p className="info-card__num">Step 03</p>
            <h3>Track live counts</h3>
            <p>Attendance numbers update publicly while full guest lists stay in Admin.</p>
          </article>
          <article className="info-card reveal">
            <p className="info-card__num">Step 04</p>
            <h3>Host with clarity</h3>
            <p>Use the list for check-in, seating, catering numbers, and follow-up.</p>
          </article>
        </div>
      </section>

      <section className="band">
        <div className="section">
          <div className="split split--wide">
            <div className="reveal">
              <p className="eyebrow">Why Endless Clicks</p>
              <h2>Built for turnout, timing, and trust.</h2>
              <p>
                Too many events fail because promotion starts late, details stay unclear,
                or nobody owns the guest experience. We treat attendance as a measurable outcome —
                not a hopeful guess.
              </p>
              <ul className="list-check">
                <li>Clear event pages with date, venue, and programme context</li>
                <li>Countdown and live status so urgency feels natural, not forced</li>
                <li>Registration data your team can export and act on</li>
                <li>A queue system that always features the next relevant event</li>
              </ul>
            </div>
            <div className="stat-row reveal">
              <div className="stat-box">
                <strong>3</strong>
                <span>Core service pillars</span>
              </div>
              <div className="stat-box">
                <strong>Live</strong>
                <span>Guest count updates</span>
              </div>
              <div className="stat-box">
                <strong>Admin</strong>
                <span>Full guest list control</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal">
          <p className="eyebrow">Current lineup</p>
          <h2>Upcoming & live events</h2>
          <p>
            Published events appear here automatically. When one ends, the next queued
            event takes the featured spot and starts its countdown.
          </p>
        </div>
        {events.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="empty-state reveal">
            <h3>Lineup coming soon</h3>
            <p className="muted">
              There are no published events at the moment. Check back shortly, or contact
              Endless Clicks if you want us to plan and advertise your next gathering.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Contact the team
            </Link>
          </div>
        )}
      </section>

      <section className="band-soft">
        <div className="section">
          <div className="section__head reveal">
            <p className="eyebrow">Working process</p>
            <h2>From brief to packed room</h2>
          </div>
          <div className="process-steps">
            <article className="process-step reveal">
              <h3>Discovery</h3>
              <p>We align on goals, audience, date options, budget range, and success metrics.</p>
            </article>
            <article className="process-step reveal">
              <h3>Planning</h3>
              <p>We lock venue flow, programme structure, vendors, and communication timeline.</p>
            </article>
            <article className="process-step reveal">
              <h3>Promotion</h3>
              <p>We publish the event, drive registrations, and keep reminders consistent.</p>
            </article>
            <article className="process-step reveal">
              <h3>Delivery</h3>
              <p>We host the experience, track attendance, and hand over clear wrap notes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div className="reveal">
            <p className="eyebrow">Quick answers</p>
            <h2>Common questions</h2>
            <div className="faq">
              <details>
                <summary>Can guests register without buying tickets?</summary>
                <p>
                  Yes. This platform is built for RSVP-style registration — guests confirm
                  attendance and share key details so you can prepare properly.
                </p>
              </details>
              <details>
                <summary>Where do I manage guest lists?</summary>
                <p>
                  Sign in at the Admin page to add events, publish or hide them, review
                  registrations, and export CSV files.
                </p>
              </details>
              <details>
                <summary>What happens when an event ends?</summary>
                <p>
                  The site stops featuring that event as live/upcoming and automatically
                  promotes the next published event in the queue.
                </p>
              </details>
            </div>
          </div>
          <div className="info-card reveal">
            <p className="eyebrow">Next step</p>
            <h2>Ready to plan your event?</h2>
            <p>
              Tell us the date, city, audience size, and outcome you need. We will respond
              with availability and a practical planning outline.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
