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
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out',
      })
      gsap.from('.about-card', {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power2.out',
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="page">
      <header className="about-hero">
        <p className="eyebrow">About</p>
        <h1>Endless Clicks Pty Ltd</h1>
        <p>
          We are an event company built for momentum — hosting unforgettable nights,
          planning every operational detail, and advertising upcoming experiences until the room is full.
        </p>
        <img className="about-hero__logo" src={logoLight} alt="Endless Clicks logo" />
      </header>

      <section className="about-grid">
        <article className="about-card">
          <h2>Host</h2>
          <p>
            We run the night on the ground: guest flow, stage cues, partner activations,
            and the kind of hosting that makes first-timers feel like regulars.
          </p>
        </article>
        <article className="about-card">
          <h2>Plan</h2>
          <p>
            Concept, timeline, vendors, risk checks, and run-of-show. Endless Clicks
            turns ambitious briefs into executable productions with clear owners and zero guesswork.
          </p>
        </article>
        <article className="about-card">
          <h2>Advertise</h2>
          <p>
            Countdowns, guest lists, live attendance signals, and story-led campaigns —
            we advertise events in a way that converts curiosity into confirmed attendance.
          </p>
        </article>
      </section>

      <section className="section split-card">
        <p className="eyebrow">How this site works</p>
        <h2>A living event board</h2>
        <p>
          Events are queued in our system. The website always features the next live or
          upcoming night, shows a countdown until doors, flips to “Event is live” when it starts,
          and rolls forward to the next event when it ends. Guests register with their details so
          we know who is coming — and everyone can watch the live count climb.
        </p>
        <Link className="btn btn--primary" to="/events">
          See what&apos;s next
        </Link>
      </section>
    </div>
  )
}
