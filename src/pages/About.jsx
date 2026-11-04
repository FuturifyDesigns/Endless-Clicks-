import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import logoLight from '../assets/logo-light.jpg'

gsap.registerPlugin(useGSAP)

export default function About() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('.about-hero > *', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
      })
      gsap.from('.reveal', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        delay: 0.15,
        ease: 'power2.out',
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="page">
      <header className="about-hero">
        <p className="eyebrow">About Endless Clicks</p>
        <h1>We turn event ideas into attended experiences.</h1>
        <p className="lead">
          Endless Clicks Pty Ltd is a professional event company focused on hosting,
          planning, and advertising. We help clients create clear programmes, communicate
          with guests properly, and measure turnout through structured registration.
        </p>
        <img className="about-hero__logo" src={logoLight} alt="Endless Clicks logo" />
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="split split--wide">
          <div className="content-block reveal">
            <p className="eyebrow">Our purpose</p>
            <h2>Events should feel organised, welcoming, and worth the trip.</h2>
            <p>
              Endless Clicks exists for teams that want more than a date on a calendar.
              We build the operating backbone around an event: the story, the schedule,
              the guest journey, and the promotion that fills seats.
            </p>
            <p>
              Our approach is practical. We start with who should attend and why they should
              care, then reverse-engineer the plan, messaging, and on-the-day hosting required
              to deliver that outcome.
            </p>
          </div>
          <div className="stat-row reveal">
            <div className="stat-box">
              <strong>Host</strong>
              <span>On-site delivery</span>
            </div>
            <div className="stat-box">
              <strong>Plan</strong>
              <span>Operations & timeline</span>
            </div>
            <div className="stat-box">
              <strong>Advertise</strong>
              <span>Awareness to RSVP</span>
            </div>
          </div>
        </div>
      </section>

      <section className="band-soft">
        <div className="section">
          <div className="section__head reveal">
            <p className="eyebrow">What we do</p>
            <h2>Three connected services</h2>
            <p>
              Most clients need a blend of all three. You can also engage Endless Clicks for
              a single pillar when you already have part of the team in place.
            </p>
          </div>
          <div className="about-grid">
            <article className="about-card reveal">
              <h3>Hosting</h3>
              <p>
                We manage guest arrival, seating flow, stage cues, partner logistics, and
                real-time problem solving so organisers can stay focused on people — not fires.
              </p>
              <ul className="list-check">
                <li>Door and check-in support</li>
                <li>Programme timing</li>
                <li>Vendor liaison on site</li>
              </ul>
            </article>
            <article className="about-card reveal">
              <h3>Planning</h3>
              <p>
                From concept to run-of-show, we translate ambition into an executable plan with
                owners, deadlines, and contingencies.
              </p>
              <ul className="list-check">
                <li>Brief and budget framing</li>
                <li>Venue and supplier coordination</li>
                <li>Risk and contingency notes</li>
              </ul>
            </article>
            <article className="about-card reveal">
              <h3>Advertising</h3>
              <p>
                We promote upcoming events with clear calls to action, registration capture,
                and reminder sequences that improve show-up rates.
              </p>
              <ul className="list-check">
                <li>Event page and messaging</li>
                <li>RSVP collection</li>
                <li>Live attendance visibility</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head reveal">
          <p className="eyebrow">Who we serve</p>
          <h2>Built for teams that need reliable turnout</h2>
        </div>
        <div className="info-grid">
          <article className="info-card reveal">
            <h3>Brands & agencies</h3>
            <p>Product launches, partner evenings, showcase nights, and campaign activations.</p>
          </article>
          <article className="info-card reveal">
            <h3>Corporates</h3>
            <p>Town halls, leadership sessions, client forums, and internal celebrations.</p>
          </article>
          <article className="info-card reveal">
            <h3>Communities</h3>
            <p>Public programmes, cultural gatherings, fundraisers, and civic events.</p>
          </article>
          <article className="info-card reveal">
            <h3>Venues & promoters</h3>
            <p>Partners who need stronger guest communication and registration discipline.</p>
          </article>
        </div>
      </section>

      <section className="band">
        <div className="section">
          <div className="split">
            <div className="reveal">
              <p className="eyebrow">How this website supports events</p>
              <h2>A living event board for your audience</h2>
              <p>
                Published events appear with countdown timers. When an event is in progress,
                the site marks it live. When it ends, the next queued event becomes featured.
                Guests can register their attendance, and organisers can review the full list
                in Admin.
              </p>
            </div>
            <div className="reveal">
              <ul className="list-check">
                <li>Public event pages with essential details</li>
                <li>Registration forms for guest information</li>
                <li>Live “going” counts for social proof</li>
                <li>Admin tools to add, publish, and export</li>
              </ul>
              <Link className="btn btn--secondary" to="/events" style={{ marginTop: '1rem' }}>
                View events board
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div className="info-card reveal">
            <p className="eyebrow">Values</p>
            <h2>Clarity over hype</h2>
            <p>
              We prefer precise schedules, honest capacity planning, and communication that
              respects people’s time. A good event feels intentional from the first email to
              the final thank-you.
            </p>
          </div>
          <div className="info-card reveal">
            <p className="eyebrow">Work with us</p>
            <h2>Tell us what you are planning</h2>
            <p>
              Share your date window, city, expected audience, and goal. We will come back
              with availability and a recommended engagement path.
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
