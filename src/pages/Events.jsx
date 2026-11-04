import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EventCard from '../components/EventCard'
import { useEvents } from '../hooks/useEvents'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getEventStatus } from '../lib/events'
import venue from '../assets/photos/venue.jpg'
import heroLive from '../assets/photos/hero-live.jpg'
import workflowDeliver from '../assets/photos/workflow-deliver.jpg'
import hosting from '../assets/photos/hosting.jpg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Events() {
  const root = useRef(null)
  const { events, stats, loading, error, now } = useEvents()

  const live = events.filter((e) => getEventStatus(e, now) === 'live')
  const upcoming = events.filter((e) => getEventStatus(e, now) === 'upcoming')
  const past = events.filter((e) => getEventStatus(e, now) === 'ended')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.events-hero__eyebrow', { y: 20, autoAlpha: 0, duration: 0.5 })
          .from('.events-hero h1', { y: 48, autoAlpha: 0, duration: 0.85 }, '-=0.2')
          .from('.events-hero__lead', { y: 24, autoAlpha: 0, duration: 0.55 }, '-=0.4')
          .from('.events-hero__media', {
            clipPath: 'inset(100% 0 0 0)',
            duration: 1.1,
            ease: 'power4.inOut',
          }, '-=0.55')
          .from('.events-hero__stats > *', {
            y: 24,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.5,
          }, '-=0.35')

        gsap.to('.events-hero__media img', {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.events-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.utils.toArray('.events-spotlight').forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 40, rotateX: 6 },
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [loading] },
  )

  useScrollReveal(root, '.reveal-card', [events.length, loading])

  return (
    <div ref={root} className="page page--flush">
      <section className="events-hero">
        <div className="events-hero__copy">
          <p className="eyebrow events-hero__eyebrow">The heart of Endless Clicks</p>
          <h1>Events worth showing up for.</h1>
          <p className="lead events-hero__lead">
            Browse upcoming and live listings posted by Endless Clicks in Gaborone.
            Open a night, follow the countdown, and register that you are coming.
          </p>
        </div>
        <div className="events-hero__media">
          <img src={venue} alt="Endless Clicks event venue ready for guests" />
          <div className="events-hero__overlay">
            <span>Gaborone</span>
            <strong>Event board</strong>
          </div>
        </div>
        <div className="events-hero__stats">
          <div>
            <strong>{upcoming.length}</strong>
            <span>Upcoming</span>
          </div>
          <div>
            <strong>{live.length}</strong>
            <span>Live now</span>
          </div>
          <div>
            <strong>{events.length}</strong>
            <span>Listed</span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="events-spotlight-grid">
          <article className="events-spotlight">
            <img src={heroLive} alt="Audience enjoying a live event" />
            <div>
              <p className="eyebrow">Atmosphere</p>
              <h3>Nights that feel alive</h3>
              <p>From first look to last cheer — Endless Clicks listings showcase the energy of each gathering.</p>
            </div>
          </article>
          <article className="events-spotlight">
            <img src={workflowDeliver} alt="Coordinator managing a live programme" />
            <div>
              <p className="eyebrow">On the night</p>
              <h3>Clear status, smooth arrivals</h3>
              <p>Live markers and registration keep guests informed from countdown to doors.</p>
            </div>
          </article>
          <article className="events-spotlight">
            <img src={hosting} alt="Team preparing the room" />
            <div>
              <p className="eyebrow">Before doors</p>
              <h3>Details you can trust</h3>
              <p>Venue, timing, and context — everything you need before you decide to go.</p>
            </div>
          </article>
        </div>
      </section>

      {loading && <p className="muted wrap">Loading events…</p>}
      {error && <p className="form-alert form-alert--error wrap">{error}</p>}

      {live.length > 0 && (
        <section className="section section--tight">
          <div className="section__head reveal-card">
            <p className="eyebrow">Happening now</p>
            <h2>Live Endless Clicks events</h2>
          </div>
          <div className="event-grid event-grid--featured">
            {live.map((event) => (
              <div className="reveal-card" key={event.id}>
                <EventCard event={event} stat={stats[event.id]} now={now} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section section--tight band-soft">
        <div className="section__head reveal-card">
          <p className="eyebrow">Upcoming</p>
          <h2>Reserve your place</h2>
          <p>Register on any open listing so Endless Clicks knows you are coming.</p>
        </div>
        {upcoming.length === 0 && !loading ? (
          <div className="empty-state reveal-card">
            <h3>New dates coming soon</h3>
            <p className="muted">
              Fresh Endless Clicks listings will appear here. Questions? Reach us in Gaborone.
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
        <section className="section section--tight">
          <div className="section__head reveal-card">
            <p className="eyebrow">Recently completed</p>
            <h2>Moments that already happened</h2>
          </div>
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
