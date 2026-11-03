import { getCountdownParts } from '../lib/events'

export default function Countdown({ targetIso, label = 'Starts in', live = false }) {
  if (live) {
    return (
      <div className="countdown countdown--live" aria-live="polite">
        <span className="countdown__pulse" />
        <p className="countdown__live-label">Event is live</p>
      </div>
    )
  }

  if (!targetIso) return null

  const { days, hours, minutes, seconds } = getCountdownParts(targetIso)
  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Mins', value: minutes },
    { label: 'Secs', value: seconds },
  ]

  return (
    <div className="countdown" aria-label={label}>
      <p className="countdown__label">{label}</p>
      <div className="countdown__grid">
        {units.map((unit) => (
          <div key={unit.label} className="countdown__unit">
            <span className="countdown__value">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="countdown__unit-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
