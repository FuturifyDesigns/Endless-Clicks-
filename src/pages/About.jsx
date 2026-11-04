import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'
import logo from '../assets/logo-transparent.png'
import planning from '../assets/photos/planning.jpg'
import consult from '../assets/photos/consult.jpg'
import workflowDiscover from '../assets/photos/workflow-discover.jpg'
import workflowDeliver from '../assets/photos/workflow-deliver.jpg'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const treeNodes = [
  {
    id: 'root',
    label: 'Endless Clicks',
    title: 'Who we are',
    body: 'Endless Clicks Pty Ltd is based in Gaborone, Botswana. This website is where we advertise our upcoming events.',
  },
  {
    id: 'board',
    label: 'Branch · Listings',
    title: 'A clear event board',
    body: 'Upcoming Endless Clicks events appear with date, venue, and context so guests can decide quickly.',
  },
  {
    id: 'countdown',
    label: 'Branch · Timing',
    title: 'Countdown to live',
    body: 'Upcoming events show a countdown. When they start, status switches to live. When they end, the next listing takes focus.',
  },
  {
    id: 'rsvp',
    label: 'Branch · RSVP',
    title: 'Confirm you are coming',
    body: 'Guests register with their details. Live attendance counts show energy building before doors open.',
  },
  {
    id: 'place',
    label: 'Canopy · Place',
    title: 'Rooted in Gaborone',
    body: 'Our events are made for Botswana audiences — local venues, local timing, welcoming guest experience.',
  },
  {
    id: 'promise',
    label: 'Canopy · Promise',
    title: 'Clarity first',
    body: 'Honest details, practical information, and registration that respects your time.',
  },
]

export default function About() {
  const root = useRef(null)
  const treeRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about-hero__logo', {
          scale: 0.86,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'back.out(1.4)',
        })
        gsap.from('.about-hero .eyebrow, .about-hero h1, .about-hero .lead', {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.15,
          ease: 'power3.out',
        })

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
                end: 'bottom 55%',
                scrub: 0.5,
              },
            },
          )
        }
        gsap.set(nodes, { autoAlpha: 0, y: 24 })
        ScrollTrigger.batch(nodes, {
          start: 'top 88%',
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08, overwrite: 'auto' }),
          onLeaveBack: (batch) =>
            gsap.to(batch, { autoAlpha: 0, y: 16, duration: 0.28, overwrite: 'auto' }),
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  useScrollReveal(root, '.reveal-card')

  return (
    <div ref={root} className="page">
      <header className="about-hero about-hero--tight">
        <img className="about-hero__logo" src={logo} alt="Endless Clicks logo" />
        <p className="eyebrow">About Endless Clicks</p>
        <h1>We post events. You choose which ones to attend.</h1>
        <p className="lead">
          Endless Clicks Pty Ltd advertises its upcoming events here so people in Gaborone
          can discover what’s next and register their attendance.
        </p>
      </header>

      <section className="section section--tight">
        <div className="split split--wide">
          <div className="media-frame reveal-card">
            <img src={workflowDiscover} alt="Endless Clicks team collaborating" />
          </div>
          <div className="reveal-card">
            <p className="eyebrow">Our focus</p>
            <h2>An event advertising home for Endless Clicks.</h2>
            <p>
              This site is the public board for events created and shared by Endless Clicks —
              with registration so we know who plans to be there.
            </p>
          </div>
        </div>
      </section>

      <section className="section tree-section section--tight">
        <div className="section__head reveal-card">
          <p className="eyebrow">Scroll the story</p>
          <h2>The Endless Clicks tree</h2>
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
        <div className="section section--tight">
          <div className="photo-mosaic">
            <figure className="reveal-card">
              <img src={planning} alt="Planning materials for an event" />
              <figcaption>Care behind every listing</figcaption>
            </figure>
            <figure className="reveal-card">
              <img src={consult} alt="Conversation with guests" />
              <figcaption>People at the centre</figcaption>
            </figure>
            <figure className="reveal-card">
              <img src={workflowDeliver} alt="Live event coordination" />
              <figcaption>Delivery on the night</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="info-card reveal-card">
          <p className="eyebrow">Get in touch</p>
          <h2>Questions about a listing?</h2>
          <p>Email info@endlessclicks.co.bw — we are based in Gaborone.</p>
          <Link className="btn btn--primary" to="/contact">
            Contact Endless Clicks
          </Link>
        </div>
      </section>
    </div>
  )
}
