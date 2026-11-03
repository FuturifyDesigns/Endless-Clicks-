import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logoDark from '../assets/logo-dark.png'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <img src={logoDark} alt="Endless Clicks" />
        </Link>

        <button
          className="nav__toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link className="btn btn--primary btn--sm" to="/events" onClick={() => setOpen(false)}>
            Register
          </Link>
        </nav>
      </div>
    </header>
  )
}
