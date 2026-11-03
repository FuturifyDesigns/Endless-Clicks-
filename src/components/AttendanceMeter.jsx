export default function AttendanceMeter({
  registrationCount = 0,
  guestCount = 0,
  capacity,
}) {
  const going = guestCount || registrationCount
  const percent = capacity ? Math.min(100, Math.round((going / capacity) * 100)) : null

  return (
    <div className="attendance">
      <div className="attendance__top">
        <p className="attendance__count">
          <strong>{going}</strong> going
        </p>
        {capacity ? (
          <p className="attendance__cap">{capacity} capacity</p>
        ) : (
          <p className="attendance__cap">{registrationCount} registered</p>
        )}
      </div>
      {percent !== null && (
        <div className="attendance__bar" aria-hidden="true">
          <span style={{ width: `${percent}%` }} />
        </div>
      )}
    </div>
  )
}
