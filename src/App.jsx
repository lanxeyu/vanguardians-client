import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import * as Pages from './pages';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Pages.Home />}/>
        <Route path="leaderboard" element={<Pages.Leaderboard />}/>
        <Route path='characters' element={<Pages.Characters />}/>
      </Route>
      <Route path='/game' element={<Pages.GamePage />}/>
    </Routes>
  )
}

export default App
