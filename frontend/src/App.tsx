import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Auth from './pages/Auth/Auth'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/auth/:id' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App