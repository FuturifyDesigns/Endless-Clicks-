import { useState } from 'react'

export default function InteractiveCard({
  eyebrow,
  title,
  summary,
  detail,
  image,
  imageAlt = '',
  className = '',
}) {
  const [open, setOpen] = useState(false)

  return (
    <article
      className={`ix-card reveal-card ${open ? 'is-open' : ''} ${className}`.trim()}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {image && (
        <div className="ix-card__media">
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
      )}
      <div className="ix-card__body">
        {eyebrow && <p className="info-card__num">{eyebrow}</p>}
        <h3>{title}</h3>
        <p>{summary}</p>
        {detail && (
          <div className="ix-card__detail" aria-hidden={!open}>
            <p>{detail}</p>
          </div>
        )}
        <span className="ix-card__hint">{open ? 'Close' : 'Hover or focus for more'}</span>
      </div>
    </article>
  )
}
