import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import GuardianProfile from '../../components/GuardianProfile'

const Guardian = () => {
  const [guardian, setGuardian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams()

  useEffect(() => {
    fetchGuardian()
  }, [])

  async function fetchGuardian() {
    try{
      const response = await fetch(`https://vanguardians-server.onrender.com/guardians/${id}`)
      const data = await response.json()
      setGuardian(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
    }
  }


  console.log(guardian)
  const errorOrGallery = error ? 'There was an error loading the Guardians' : <GuardianProfile guardian={guardian} />

    return (
      loading ? <p>Loading...</p> : errorOrGallery
  )
}

export default Guardian
