import { Link } from 'react-router-dom'
import logoDark from '../assets/logo-dark.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <img className="footer__logo" src={logoDark} alt="Endless Clicks" />
          <p>
            Endless Clicks Pty Ltd hosts, plans, and advertises events that feel
            inevitable — from countdown to crowd to closing lights.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/events">Upcoming events</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <div>
          <h4>Studio</h4>
          <p>Johannesburg · Cape Town · Remote</p>
          <a href="mailto:hello@endlessclicks.co.za">hello@endlessclicks.co.za</a>
        </div>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} Endless Clicks Pty Ltd. All rights reserved.
      </p>
    </footer>
  )
}
