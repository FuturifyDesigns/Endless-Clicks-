export function getEventStatus(event, now = Date.now()) {
  const start = new Date(event.start_at).getTime()
  const end = new Date(event.end_at).getTime()

  if (Number.isNaN(start) || Number.isNaN(end)) return 'upcoming'
  if (now < start) return 'upcoming'
  if (now >= start && now < end) return 'live'
  return 'ended'
}

export function pickFeaturedEvent(events, now = Date.now()) {
  if (!events?.length) return null

  const ranked = [...events].sort(
    (a, b) => new Date(a.start_at) - new Date(b.start_at),
  )

  const live = ranked.find((event) => getEventStatus(event, now) === 'live')
  if (live) return live

  const upcoming = ranked.find((event) => getEventStatus(event, now) === 'upcoming')
  if (upcoming) return upcoming

  return ranked[ranked.length - 1]
}

export function formatEventDate(iso) {
  return new Intl.DateTimeFormat('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function formatShortDate(iso) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getCountdownParts(targetIso, now = Date.now()) {
  const diff = Math.max(0, new Date(targetIso).getTime() - now)
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds, totalMs: diff }
}
