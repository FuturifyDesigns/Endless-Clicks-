import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { pickFeaturedEvent } from '../lib/events'

async function fetchStats() {
  const { data, error } = await supabase.from('event_registration_stats').select('*')
  if (error) throw error
  const map = {}
  for (const row of data || []) {
    map[row.event_id] = row
  }
  return map
}

export function useEvents() {
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [now, setNow] = useState(Date.now())

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [{ data, error: eventsError }, statsMap] = await Promise.all([
        supabase
          .from('events')
          .select('*')
          .eq('is_published', true)
          .order('start_at', { ascending: true }),
        fetchStats(),
      ])
      if (eventsError) throw eventsError
      setEvents(data || [])
      setStats(statsMap)
    } catch (err) {
      setError(err.message || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('public-registrations')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'registrations' },
        () => {
          fetchStats()
            .then(setStats)
            .catch(() => {})
        },
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        () => {
          load()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [load])

  const featured = pickFeaturedEvent(events, now)

  return {
    events,
    stats,
    featured,
    loading,
    error,
    now,
    reload: load,
  }
}

export function useEvent(slug) {
  const [event, setEvent] = useState(null)
  const [stat, setStat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: eventError } = await supabase
          .from('events')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle()
        if (eventError) throw eventError
        if (!active) return
        setEvent(data)
        if (data) {
          const { data: stats } = await supabase
            .from('event_registration_stats')
            .select('*')
            .eq('event_id', data.id)
            .maybeSingle()
          if (active) setStat(stats)
        }
      } catch (err) {
        if (active) setError(err.message || 'Event not found')
      } finally {
        if (active) setLoading(false)
      }
    }
    if (slug) load()
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(tick)
  }, [])

  return { event, stat, loading, error, now }
}
