import { createClient } from '@supabase/supabase-js'

const url =
  import.meta.env.VITE_SUPABASE_URL || 'https://vrslvvjamxdvrtzerftx.supabase.co'
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyc2x2dmphbXhkdnJ0emVyZnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3NDIxMTgsImV4cCI6MjEwOTMxODExOH0.UN__XmDHOWBQSqT0yfCfX4gczBt8MWR_IsjBnlev1WM'

export const supabase = createClient(url, anonKey)
