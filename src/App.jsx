import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Layouts
import Layout from './components/Layout'
import PublicLayout from './components/layout/PublicLayout'

// Staff Pages
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Rates from './pages/Rates'
import Invoices from './pages/Invoices'
import Hotels from './pages/Hotels'
import BookingHistory from './pages/BookingHistory'
import Reports from './pages/Reports'
import Expenses from './pages/Expenses'
import Login from './pages/Login'

// Public Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CollectionPage from './pages/CollectionPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Auth Route */}
      <Route path="/login" element={<Login />} />

      {/* Staff Routes */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="rates" element={<Rates />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="reports" element={<Reports />} />
        <Route path="history" element={<BookingHistory />} />
      </Route>
    </Routes>
  )
}