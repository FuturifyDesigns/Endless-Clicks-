import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
