import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Auth from './pages/Auth/Auth'
import Layout from './Dashbaord/Layout'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/dashbaord/*' element={<Layout />} />
        <Route path='/auth/:id' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App