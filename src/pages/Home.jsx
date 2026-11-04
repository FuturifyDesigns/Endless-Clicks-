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
            <h1>Events people remember — planned with care, hosted with polish.</h1>
            <p className="lead">
              Endless Clicks Pty Ltd hosts, plans, and advertises professional gatherings
              across Botswana. From intimate consultations to full venue productions, we
              help you fill the room and run the day with confidence.
            </p>
            <div className="hero__actions">
              <Link
                className="btn btn--primary"
                to={featured ? `/events/${featured.slug}` : '/contact'}
              >
                {featured ? 'Register for this event' : 'Start a conversation'}
              </Link>
              <Link className="btn btn--ghost" to="/events">
                Browse events
              </Link>
            </div>
            <div className="hero__meta">
              <div>
                <strong>Host</strong>
                <span>On-site delivery</span>
              </div>
              <div>
                <strong>Plan</strong>
                <span>End-to-end prep</span>
              </div>
              <div>
                <strong>Advertise</strong>
                <span>Drive attendance</span>
              </div>
            </div>
          </div>

          <div className="hero__stage">
            <div className="hero__visual reveal-card">
              <img src={heroLive} alt="Guests enjoying a live Endless Clicks event" />
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
                <h2>Fresh dates are on the way</h2>
                <p>
                  Follow Endless Clicks for the next Gaborone gathering — or tell us about
                  an event you want hosted, planned, or promoted.
                </p>
                <Link className="btn btn--primary" to="/contact">
                  Talk to our team
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="band-soft">
        <div className="section">
          <div className="section__head reveal-card">
            <p className="eyebrow">What we deliver</p>
            <h2>Hosting, planning, and advertising — under one roof.</h2>
            <p>
              Hover each card for more detail. Every engagement is tailored to your audience,
              venue, and goals in Gaborone and beyond.
            </p>
          </div>
          <div className="services-grid">
            <InteractiveCard
              eyebrow="Service 01"
              title="Event hosting"
              summary="Calm, professional presence on the day — guest flow, stage timing, and partner support."
              detail="Our hosts keep arrivals smooth, cues on time, and stakeholders aligned so you can focus on your guests."
              image={hosting}
              imageAlt="Event team coordinating a venue setup"
            />
            <InteractiveCard
              eyebrow="Service 02"
              title="Event planning"
              summary="From concept and floor plans to suppliers and run-of-show documents."
              detail="We map the full timeline, budgets, and contingencies so nothing important is left to chance."
              image={planning}
              imageAlt="Planners reviewing event floor plans"
            />
            <InteractiveCard
              eyebrow="Service 03"
              title="Event advertising"
              summary="Clear messaging and registration that turn interest into confirmed attendance."
              detail="We help you promote the date, capture guest details, and keep reminders consistent until doors open."
              image={checkin}
              imageAlt="Guests checking in at an Endless Clicks event"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split split--wide">
          <div className="media-frame reveal-card">
            <img src={venue} alt="Prepared event hall with stage and seating" />
          </div>
          <div className="reveal-card">
            <p className="eyebrow">How guests take part</p>
            <h2>Register once. Feel the room fill.</h2>
            <p>
              Each event page shares the essentials — time, place, and what to expect — then
              invites guests to confirm attendance with their details. Live counts help everyone
              see momentum building.
            </p>
            <ul className="list-check">
              <li>Countdown to doors, then a clear “Event is live” status</li>
              <li>Simple registration with name and contact information</li>
              <li>Attendance numbers that update as people confirm</li>
            </ul>
            <Link className="btn btn--ghost" to="/events" style={{ marginTop: '0.5rem' }}>
              See open events
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="section">
          <div className="split split--wide">
            <div className="reveal-card">
              <p className="eyebrow">Why Endless Clicks</p>
              <h2>Built for turnout, timing, and trust.</h2>
              <p>
                Great events fail when details are vague or promotion starts late. We treat
                attendance as a measurable outcome — with clear pages, disciplined planning,
                and hosting that feels intentional from arrival to wrap.
              </p>
              <ul className="list-check">
                <li>Gaborone-based team with Southern African reach</li>
                <li>Practical timelines your stakeholders can follow</li>
                <li>Guest communication that respects people’s time</li>
              </ul>
            </div>
            <div className="stat-row reveal-card">
              <div className="stat-box">
                <strong>3</strong>
                <span>Service pillars</span>
              </div>
              <div className="stat-box">
                <strong>Live</strong>
                <span>Attendance pulse</span>
              </div>
              <div className="stat-box">
                <strong>BW</strong>
                <span>Based in Gaborone</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal-card">
          <p className="eyebrow">Lineup</p>
          <h2>Upcoming & live events</h2>
          <p>Confirm your spot on any open date — or ask us to create the next one with you.</p>
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
              We are preparing the next Endless Clicks experiences in Gaborone. Reach out if
              you would like us to host, plan, or advertise an event for your organisation.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Contact the team
            </Link>
          </div>
        )}
      </section>

      <section className="band-soft">
        <div className="section">
          <div className="section__head reveal-card">
            <p className="eyebrow">Working process</p>
            <h2>From brief to packed room</h2>
          </div>
          <div className="process-steps">
            <article className="process-step reveal-card">
              <h3>Discovery</h3>
              <p>Goals, audience, date options, and what success should look like.</p>
            </article>
            <article className="process-step reveal-card">
              <h3>Planning</h3>
              <p>Venue flow, programme structure, suppliers, and communication timeline.</p>
            </article>
            <article className="process-step reveal-card">
              <h3>Promotion</h3>
              <p>Event pages, registration, and reminders that keep the date top of mind.</p>
            </article>
            <article className="process-step reveal-card">
              <h3>Delivery</h3>
              <p>On-site hosting, live attendance awareness, and a clean handoff at wrap.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div className="reveal-card">
            <p className="eyebrow">Quick answers</p>
            <h2>Common questions</h2>
            <div className="faq">
              <details>
                <summary>Do guests need to buy tickets to register?</summary>
                <p>
                  Not necessarily. Many Endless Clicks events use RSVP-style registration so
                  we know who is coming and can prepare properly.
                </p>
              </details>
              <details>
                <summary>Where are you based?</summary>
                <p>
                  We are based in Gaborone, Botswana, and support events locally as well as
                  selected regional productions.
                </p>
              </details>
              <details>
                <summary>How do I start planning with you?</summary>
                <p>
                  Send a note via Contact with your date window, audience size, and goals.
                  We will respond with availability and a practical next step.
                </p>
              </details>
            </div>
          </div>
          <div className="info-card reveal-card">
            <p className="eyebrow">Next step</p>
            <h2>Ready to plan your event?</h2>
            <p>
              Tell us the date, venue status, and outcome you need. We will come back with
              a clear planning outline.
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
