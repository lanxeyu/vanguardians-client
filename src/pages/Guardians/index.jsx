import React, { useState, useEffect } from 'react'
import { GuardianGallery } from '../../components'
import axios from 'axios'
import './index.css'

const Guardians = () => {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGuardians()
  }, [])

  async function fetchGuardians() {
    try{
      const response = await axios.get('https://vanguardians-server.onrender.com/guardians')
      setGuardians(response.data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
    }
  }

    const errorOrGallery = error ? 'error' : <GuardianGallery guardians={guardians} />
  return (
    <div id="guardians-page-container">
      <h1 id="guardians-title">GUARDIANS</h1>
      <div id="guardians-main-container">
      {
        loading ? <p id="guardians-page-loading" >Loading...</p> : errorOrGallery
      }
      </div>
    </div>
  )
}

export default Guardians
