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

gsap.registerPlugin(useGSAP, ScrollTrigger)

const treeNodes = [
  {
    id: 'root',
    label: 'Endless Clicks',
    title: 'Our roots in Gaborone',
    body: 'Endless Clicks Pty Ltd grew from a simple belief: events should feel organised, welcoming, and worth showing up for. From Gaborone, Botswana, we help brands, organisations, and communities gather with intention.',
  },
  {
    id: 'host',
    label: 'Branch · Host',
    title: 'Hosting that keeps the day calm',
    body: 'On the ground we manage arrivals, programme cues, partner logistics, and the small interventions that prevent big disruptions — so organisers can stay present with their guests.',
  },
  {
    id: 'plan',
    label: 'Branch · Plan',
    title: 'Planning that turns ideas into schedules',
    body: 'Floor plans, supplier coordination, budgets, and run-of-show documents. We translate ambition into a timeline people can actually follow.',
  },
  {
    id: 'advertise',
    label: 'Branch · Advertise',
    title: 'Advertising that earns attendance',
    body: 'Clear event pages, registration, and reminders. We promote the gathering in a way that converts curiosity into confirmed guests.',
  },
  {
    id: 'people',
    label: 'Canopy · People',
    title: 'Who we serve',
    body: 'Corporates, brands, community organisers, venues, and promoters who need reliable turnout and a professional guest experience in Botswana and the region.',
  },
  {
    id: 'promise',
    label: 'Canopy · Promise',
    title: 'Clarity over hype',
    body: 'We favour honest capacity planning, precise communication, and hosting that respects people’s time — from the first briefing to the final thank-you.',
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
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: true,
            },
          },
        )
      }

      nodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          { autoAlpha: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play reverse play reverse',
            },
          },
        )
      })
    },
    { scope: root, revertOnUpdate: true },
  )

  return (
    <div ref={root} className="page">
      <header className="about-hero">
        <p className="eyebrow">About Endless Clicks</p>
        <h1>We turn event ideas into attended experiences.</h1>
        <p className="lead">
          Based in Gaborone, Botswana, Endless Clicks Pty Ltd is a professional event
          company focused on hosting, planning, and advertising gatherings that feel
          intentional from first brief to final applause.
        </p>
        <img className="about-hero__logo" src={logoLight} alt="Endless Clicks logo" />
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="split split--wide">
          <div className="media-frame reveal-card">
            <img src={consult} alt="Endless Clicks team consulting with clients" />
          </div>
          <div className="reveal-card">
            <p className="eyebrow">Our purpose</p>
            <h2>Events should feel organised, welcoming, and worth the trip.</h2>
            <p>
              We start with who should attend and why they should care, then build the plan,
              messaging, and on-the-day hosting required to deliver that outcome.
            </p>
            <p>
              Whether you need a polished corporate session, a public showcase, or a
              community gathering, we bring practical structure and a warm guest experience.
            </p>
          </div>
        </div>
      </section>

      <section className="section tree-section">
        <div className="section__head reveal-card">
          <p className="eyebrow">Scroll the story</p>
          <h2>The Endless Clicks tree</h2>
          <p>
            Scroll down to grow each branch of who we are. Scroll up and the story folds
            back — a living map of our work.
          </p>
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
            <p className="eyebrow">In the room</p>
            <h2>How our work looks on the ground</h2>
          </div>
          <div className="photo-mosaic">
            <figure className="reveal-card">
              <img src={planning} alt="Detailed event planning session" />
              <figcaption>Planning sessions with clear floor plans and timelines</figcaption>
            </figure>
            <figure className="reveal-card">
              <img src={hosting} alt="Venue preparation before doors open" />
              <figcaption>Hands-on hosting before guests arrive</figcaption>
            </figure>
            <figure className="reveal-card">
              <img src={checkin} alt="Guest check-in at an event entrance" />
              <figcaption>Warm, efficient arrivals and registration</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div className="info-card reveal-card">
            <p className="eyebrow">Values</p>
            <h2>Clarity over hype</h2>
            <p>
              Precise schedules, honest capacity planning, and communication that respects
              people’s time. A good event feels intentional from the first email to the last goodbye.
            </p>
          </div>
          <div className="info-card reveal-card">
            <p className="eyebrow">Work with us</p>
            <h2>Tell us what you are planning</h2>
            <p>
              Share your date window, audience, and goal. We are based in Gaborone and ready
              to help you host, plan, or advertise the next gathering.
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
