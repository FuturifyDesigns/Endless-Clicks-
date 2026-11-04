import { Link } from 'react-router-dom'
import logo from '../assets/logo-transparent.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <img className="footer__logo" src={logo} alt="Endless Clicks" />
            <p>
              Endless Clicks Pty Ltd advertises upcoming events in Gaborone, Botswana —
              so guests can discover what’s next and confirm they are coming.
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
