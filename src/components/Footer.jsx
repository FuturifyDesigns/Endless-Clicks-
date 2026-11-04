import { Link } from 'react-router-dom'
import logoDark from '../assets/logo-dark.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <img className="footer__logo" src={logoDark} alt="Endless Clicks" />
            <p>
              Endless Clicks Pty Ltd is an event hosting, planning, and advertising
              company helping brands and communities fill rooms with the right people.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/events">Events</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin">Admin</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Gaborone · Johannesburg · Regional pop-ups</p>
            <a href="mailto:hello@endlessclicks.co.za">hello@endlessclicks.co.za</a>
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
