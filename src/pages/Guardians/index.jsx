import React, { useState, useEffect } from 'react'
import { GuardianGallery } from '../../components'

const Guardians = () => {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGuardians()
  }, [])

  async function fetchGuardians() {
    try{
      const response = await fetch('http://localhost:5000/guardians')
      const data = await response.json()
      setGuardians(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
    }
  }

    const errorOrGallery = error ? 'error' : <GuardianGallery guardians={guardians} />
  return (
    <>
      {
        loading ? <p>Loading...</p> : errorOrGallery
      }
    </>
  )
}

export default Guardians
