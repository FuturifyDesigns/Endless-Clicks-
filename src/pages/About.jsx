import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { enterStagger } from '../lib/motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import logoLight from '../assets/logo-light.jpg'
import planning from '../assets/photos/planning.jpg'
import hosting from '../assets/photos/hosting.jpg'
import checkin from '../assets/photos/checkin.jpg'
import consult from '../assets/photos/consult.jpg'
import heroLive from '../assets/photos/hero-live.jpg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const treeNodes = [
  {
    id: 'root',
    label: 'Endless Clicks',
    title: 'Who we are',
    body: 'Endless Clicks Pty Ltd is based in Gaborone, Botswana. We create and share events that bring people together — and this website is where those events are advertised.',
  },
  {
    id: 'board',
    label: 'Branch · Listings',
    title: 'A clear event board',
    body: 'Upcoming Endless Clicks events appear here with date, venue, and context so guests can decide quickly and feel informed.',
  },
  {
    id: 'countdown',
    label: 'Branch · Timing',
    title: 'Countdown to live',
    body: 'Each upcoming event shows a countdown. When it starts, status switches to live. When it ends, the next Endless Clicks listing takes focus.',
  },
  {
    id: 'rsvp',
    label: 'Branch · RSVP',
    title: 'Confirm you are coming',
    body: 'Guests register with their name and key details. Live attendance counts help everyone see the energy building before doors open.',
  },
  {
    id: 'place',
    label: 'Canopy · Place',
    title: 'Rooted in Gaborone',
    body: 'Our events are planned with Botswana audiences in mind — local venues, local timing, and a guest experience that feels welcoming.',
  },
  {
    id: 'promise',
    label: 'Canopy · Promise',
    title: 'Clarity first',
    body: 'No guesswork. We aim for honest details, practical information, and registration that respects your time.',
  },
]

export default function About() {
  const root = useRef(null)
  const treeRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.about-hero > *', { ...enterStagger })
    },
    { scope: root },
  )

  useScrollReveal(root, '.reveal-card')

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray('.tree-node')
      const sap = treeRef.current?.querySelector('.tree__sap')

      if (sap) {
        gsap.fromTo(
          sap,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: treeRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 0.6,
            },
          },
        )
      }

      gsap.set(nodes, { autoAlpha: 0, y: 24 })
      ScrollTrigger.batch(nodes, {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
            overwrite: 'auto',
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: 16,
            duration: 0.3,
            overwrite: 'auto',
          }),
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="page">
      <header className="about-hero">
        <p className="eyebrow">About Endless Clicks</p>
        <h1>We post events. You choose which ones to attend.</h1>
        <p className="lead">
          Endless Clicks Pty Ltd advertises its upcoming events on this site so people in
          Gaborone — and beyond — can discover what’s next and register their attendance.
        </p>
        <img className="about-hero__logo" src={logoLight} alt="Endless Clicks logo" />
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="split split--wide">
          <div className="media-frame reveal-card">
            <img src={heroLive} alt="Audience at an Endless Clicks event" />
          </div>
          <div className="reveal-card">
            <p className="eyebrow">Our focus</p>
            <h2>An event advertising home for Endless Clicks.</h2>
            <p>
              This website is not a marketplace for every organiser. It is the public board
              for events created and shared by Endless Clicks — with registration so we know
              who plans to be there.
            </p>
            <p>
              Browse listings, follow countdowns, and confirm your spot. Simple, clear, and
              built around the guest experience.
            </p>
          </div>
        </div>
      </section>

      <section className="section tree-section">
        <div className="section__head reveal-card">
          <p className="eyebrow">Scroll the story</p>
          <h2>The Endless Clicks tree</h2>
          <p>Move down the page to reveal each part of how this event board works.</p>
        </div>

        <div className="tree" ref={treeRef}>
          <div className="tree__trunk" aria-hidden="true">
            <span className="tree__sap" />
          </div>
          {treeNodes.map((node, index) => (
            <article
              key={node.id}
              className={`tree-node ${index % 2 === 0 ? 'tree-node--left' : 'tree-node--right'}`}
            >
              <div className="tree-node__card">
                <p className="eyebrow">{node.label}</p>
                <h3>{node.title}</h3>
                <p>{node.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="band-soft">
        <div className="section">
          <div className="section__head reveal-card">
            <p className="eyebrow">Moments from our events</p>
            <h2>What Endless Clicks nights look like</h2>
          </div>
          <div className="photo-mosaic">
            <figure className="reveal-card">
              <img src={planning} alt="Planning an Endless Clicks event" />
              <figcaption>Thoughtful preparation behind every listing</figcaption>
            </figure>
            <figure className="reveal-card">
              <img src={hosting} alt="Venue ready for guests" />
              <figcaption>Spaces prepared for guests to arrive</figcaption>
            </figure>
            <figure className="reveal-card">
              <img src={checkin} alt="Guest registration at the door" />
              <figcaption>Registration that makes arrivals smoother</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div className="media-frame reveal-card">
            <img src={consult} alt="Endless Clicks team in conversation" />
          </div>
          <div className="info-card reveal-card">
            <p className="eyebrow">Get in touch</p>
            <h2>Questions about a listing?</h2>
            <p>
              Reach us in Gaborone at info@endlessclicks.co.bw — we are happy to help with
              event details or registration queries.
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
