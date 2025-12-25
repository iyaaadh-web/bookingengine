import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Bookings from './pages/Bookings'
import Rates from './pages/Rates'
import Invoices from './pages/Invoices'
import Hotels from './pages/Hotels'
import BookingHistory from './pages/BookingHistory'
import Reports from './pages/Reports'
import Expenses from './pages/Expenses'
import Login from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
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