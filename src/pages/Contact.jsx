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
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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
          <h1>Let&apos;s build the next night</h1>
          <p>
            Booking an Endless Clicks production, partnership, or private takeover?
            Send a note — we&apos;ll come back with availability and a planning outline.
          </p>
        </header>

        <div className="contact-grid">
          <div className="split-card">
            <h2>Studio details</h2>
            <p>
              <strong>Email</strong>
              <br />
              <a href="mailto:hello@endlessclicks.co.za">hello@endlessclicks.co.za</a>
            </p>
            <p>
              <strong>Coverage</strong>
              <br />
              Johannesburg · Cape Town · Durban · nationwide pop-ups
            </p>
            <p>
              <strong>Response window</strong>
              <br />
              Typically within 1–2 business days
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form__grid">
              <label>
                Name
                <input required name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input required type="email" name="email" placeholder="you@brand.com" />
              </label>
              <label className="register-form__full">
                What are you planning?
                <textarea
                  required
                  rows="5"
                  name="message"
                  placeholder="Date, city, audience size, vibe..."
                />
              </label>
            </div>
            {sent ? (
              <p className="form-alert form-alert--ok">
                Message captured locally — email us at hello@endlessclicks.co.za to confirm.
              </p>
            ) : (
              <button className="btn btn--primary" type="submit">
                Send enquiry
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
