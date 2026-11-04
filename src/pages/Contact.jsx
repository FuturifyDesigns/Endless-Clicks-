import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import workflowPromo from '../assets/photos/workflow-promo.jpg'
import workflowPlan from '../assets/photos/workflow-plan.jpg'

gsap.registerPlugin(useGSAP)

export default function Contact() {
  const root = useRef(null)
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.contact-wrap > header > *', { x: -28, autoAlpha: 0, duration: 0.65, stagger: 0.08 })
          .from('.contact-panel--info', { x: -40, autoAlpha: 0, duration: 0.7 }, '-=0.35')
          .from('.contact-panel--form', { x: 40, autoAlpha: 0, duration: 0.7 }, '-=0.55')
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  useScrollReveal(root, '.reveal-card')

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div ref={root} className="page">
      <div className="contact-wrap">
        <header className="contact-hero">
          <p className="eyebrow">Contact</p>
          <h1>Questions about an Endless Clicks event?</h1>
          <p className="lead">
            Reach the team in Gaborone for listing details, registration help, or general
            enquiries about upcoming Endless Clicks events.
          </p>
        </header>

        <div className="contact-grid">
          <div className="info-card contact-panel--info">
            <div className="media-frame media-frame--sm">
              <img src={workflowPromo} alt="Endless Clicks creative team" />
            </div>
            <h2>Contact details</h2>
            <div className="content-block">
              <p>
                <strong>Email</strong>
                <br />
                <a href="mailto:info@endlessclicks.co.bw">info@endlessclicks.co.bw</a>
              </p>
              <p>
                <strong>Location</strong>
                <br />
                Gaborone, Botswana
              </p>
              <p>
                <strong>Helpful to include</strong>
              </p>
              <ul className="list-check">
                <li>Which event you are asking about</li>
                <li>Your name and preferred contact number</li>
                <li>Any accessibility or arrival questions</li>
              </ul>
            </div>
          </div>

          <form className="register-form info-card contact-panel--form" onSubmit={handleSubmit}>
            <h2>Send a message</h2>
            <div className="register-form__grid">
              <label>
                Full name
                <input required name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input required type="email" name="email" placeholder="you@email.com" />
              </label>
              <label>
                Phone
                <input name="phone" placeholder="+267 ..." />
              </label>
              <label>
                Event (optional)
                <input name="event" placeholder="Event name if known" />
              </label>
              <label className="register-form__full">
                Message
                <textarea required rows="6" name="message" placeholder="How can we help?" />
              </label>
            </div>
            {sent ? (
              <p className="form-alert form-alert--ok">
                Thank you. Please also email info@endlessclicks.co.bw so we can confirm and reply.
              </p>
            ) : (
              <button className="btn btn--primary" type="submit">
                Submit message
              </button>
            )}
          </form>
        </div>

        <section className="section section--tight">
          <div className="split split--wide">
            <div className="media-frame reveal-card">
              <img src={workflowPlan} alt="Event planning discussion" />
            </div>
            <div className="reveal-card">
              <p className="eyebrow">Looking for an event?</p>
              <h2>Browse the board instead</h2>
              <p>
                See upcoming and live Endless Clicks listings, then register directly on the
                event page.
              </p>
              <Link className="btn btn--ghost" to="/events">
                Browse events
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
