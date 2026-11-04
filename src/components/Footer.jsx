import { Link } from 'react-router-dom'
import logoLight from '../assets/logo-light.jpg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <img className="footer__logo" src={logoLight} alt="Endless Clicks" />
            <p>
              Endless Clicks Pty Ltd hosts, plans, and advertises professional events
              from Gaborone, Botswana — helping people gather with clarity and style.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/events">Events</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Gaborone, Botswana</p>
            <a href="mailto:info@endlessclicks.co.bw">info@endlessclicks.co.bw</a>
            <p>Mon–Fri · 09:00–17:00</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Endless Clicks Pty Ltd. All rights reserved.
          </p>
          <p className="footer__credit">
            Built by{' '}
            <a href="https://github.com/FuturifyDesigns" target="_blank" rel="noreferrer">
              Futurify Designs
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
