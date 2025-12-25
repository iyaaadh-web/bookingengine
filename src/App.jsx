import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

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
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Auth Route */}
      <Route path="/login" element={<Login />} />

      {/* Staff Routes - All at root level with Layout wrapper */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/hotels" element={<Layout />}>
        <Route index element={<Hotels />} />
      </Route>

      <Route path="/bookings" element={<Layout />}>
        <Route index element={<Bookings />} />
      </Route>

      <Route path="/rates" element={<Layout />}>
        <Route index element={<Rates />} />
      </Route>

      <Route path="/invoices" element={<Layout />}>
        <Route index element={<Invoices />} />
      </Route>

      <Route path="/expenses" element={<Layout />}>
        <Route index element={<Expenses />} />
      </Route>

      <Route path="/reports" element={<Layout />}>
        <Route index element={<Reports />} />
      </Route>

      <Route path="/history" element={<Layout />}>
        <Route index element={<BookingHistory />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}