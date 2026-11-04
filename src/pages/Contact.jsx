import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { enterStagger } from '../lib/motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import consult from '../assets/photos/consult.jpg'
import checkin from '../assets/photos/checkin.jpg'

gsap.registerPlugin(useGSAP)

export default function Contact() {
  const root = useRef(null)
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      gsap.from('.contact-wrap > header > *', { ...enterStagger })
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
        <header>
          <p className="eyebrow">Contact</p>
          <h1>Let’s plan the next event properly.</h1>
          <p className="lead">
            Bookings, partnerships, and questions about hosting, planning, or advertising —
            we would love to hear from you in Gaborone, Botswana.
          </p>
        </header>

        <div className="contact-grid">
          <div className="info-card reveal-card">
            <div className="media-frame media-frame--sm">
              <img src={consult} alt="Consultation meeting with Endless Clicks" />
            </div>
            <h2>Studio details</h2>
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
                <strong>Response time</strong>
                <br />
                We aim to reply within 1–2 business days with availability and next steps.
              </p>
              <p>
                <strong>Helpful details to include</strong>
              </p>
              <ul className="list-check">
                <li>Preferred date or date range</li>
                <li>Venue status (secured / still exploring)</li>
                <li>Expected audience size</li>
                <li>Event type and the outcome you want</li>
                <li>Whether you need hosting, planning, advertising, or all three</li>
              </ul>
            </div>
          </div>

          <form className="register-form info-card reveal-card" onSubmit={handleSubmit}>
            <h2>Send an enquiry</h2>
            <div className="register-form__grid">
              <label>
                Full name
                <input required name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input required type="email" name="email" placeholder="you@organisation.com" />
              </label>
              <label>
                Organisation
                <input name="organisation" placeholder="Company or community" />
              </label>
              <label>
                Phone
                <input name="phone" placeholder="+267 ..." />
              </label>
              <label className="register-form__full">
                Project details
                <textarea
                  required
                  rows="6"
                  name="message"
                  placeholder="Date, venue, audience size, services needed..."
                />
              </label>
            </div>
            {sent ? (
              <p className="form-alert form-alert--ok">
                Thank you. Please also email info@endlessclicks.co.bw so our team can confirm
                receipt and follow up.
              </p>
            ) : (
              <button className="btn btn--primary" type="submit">
                Submit enquiry
              </button>
            )}
          </form>
        </div>

        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="split split--wide">
            <div className="media-frame reveal-card">
              <img src={checkin} alt="Guests arriving and checking in" />
            </div>
            <div className="reveal-card">
              <p className="eyebrow">Engagement paths</p>
              <h2>How clients usually start</h2>
              <div className="services-grid" style={{ gridTemplateColumns: '1fr' }}>
                <article className="info-card">
                  <h3>Single-event support</h3>
                  <p>
                    Ideal when you already have a date and need hosting, planning structure,
                    or promotion for one programme.
                  </p>
                </article>
                <article className="info-card">
                  <h3>Season / series</h3>
                  <p>
                    For organisations running multiple events — we help standardise guest
                    communication and delivery quality.
                  </p>
                </article>
                <article className="info-card">
                  <h3>Advertising focus</h3>
                  <p>
                    Already planned the night? We can concentrate on event pages, RSVPs, and
                    reminders that improve turnout.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
