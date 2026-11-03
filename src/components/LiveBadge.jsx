export default function LiveBadge({ status }) {
  if (status === 'live') {
    return (
      <span className="badge badge--live">
        <span className="badge__dot" />
        Live now
      </span>
    )
  }
  if (status === 'ended') {
    return <span className="badge badge--ended">Ended</span>
  }
  return <span className="badge badge--upcoming">Upcoming</span>
}
