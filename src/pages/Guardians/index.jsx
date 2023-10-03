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
    <>
      <h1 id='guardians-title' style={{"caret-color": "transparent"}}>GUARDIANS</h1>
      {
        loading ? <p style={{"fontSize": "8vh", "textAlign": "center"}}>Loading...</p> : errorOrGallery
      }
    </>
  )
}

export default Guardians
