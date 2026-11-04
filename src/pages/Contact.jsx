import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function Contact() {
  const root = useRef(null)
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      gsap.from('.contact-wrap > *', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
      })
    },
    { scope: root },
  )

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
            Use this page for bookings, partnerships, sponsorship enquiries, or questions
            about hosting, planning, and advertising support from Endless Clicks Pty Ltd.
          </p>
        </header>

        <div className="contact-grid">
          <div className="info-card">
            <h2>Studio details</h2>
            <div className="content-block">
              <p>
                <strong>Email</strong>
                <br />
                <a href="mailto:hello@endlessclicks.co.za">hello@endlessclicks.co.za</a>
              </p>
              <p>
                <strong>Service areas</strong>
                <br />
                Gaborone · Johannesburg · Cape Town · regional pop-ups across Southern Africa
              </p>
              <p>
                <strong>Response time</strong>
                <br />
                We aim to reply within 1–2 business days with availability and next steps.
              </p>
              <p>
                <strong>Best information to include</strong>
              </p>
              <ul className="list-check">
                <li>Preferred date or date range</li>
                <li>City / venue status</li>
                <li>Expected audience size</li>
                <li>Event type and outcome you want</li>
                <li>Whether you need hosting, planning, advertising, or all three</li>
              </ul>
            </div>
          </div>

          <form className="register-form info-card" onSubmit={handleSubmit}>
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
                <input name="phone" placeholder="+267 / +27 ..." />
              </label>
              <label className="register-form__full">
                Project details
                <textarea
                  required
                  rows="6"
                  name="message"
                  placeholder="Date, city, audience size, services needed, and any must-have details..."
                />
              </label>
            </div>
            {sent ? (
              <p className="form-alert form-alert--ok">
                Thanks — your enquiry is ready to send. Please also email
                hello@endlessclicks.co.za so the team can confirm receipt.
              </p>
            ) : (
              <button className="btn btn--primary" type="submit">
                Submit enquiry
              </button>
            )}
          </form>
        </div>

        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section__head">
            <p className="eyebrow">Engagement paths</p>
            <h2>How clients usually start</h2>
          </div>
          <div className="services-grid">
            <article className="info-card">
              <h3>Single-event support</h3>
              <p>
                Ideal when you already have a date and need professional hosting, planning
                structure, or promotion support for one programme.
              </p>
            </article>
            <article className="info-card">
              <h3>Season / series</h3>
              <p>
                For organisations running multiple events across a quarter. We help standardise
                registration, messaging, and delivery quality.
              </p>
            </article>
            <article className="info-card">
              <h3>Advertising only</h3>
              <p>
                Already planned the night? We can focus on event pages, RSVP capture, reminders,
                and attendance visibility.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}
