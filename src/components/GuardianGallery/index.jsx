import React from 'react'
import { GuardianCard } from '..'
import'./index.css'

const GuardianGallery = ({ guardians }) => {
  const guardianArr = guardians.guardians
  return (
    <div className="guardians">
      {
        guardianArr.map(guardian => <GuardianCard key={guardian.g_id} guardian={guardian} />)
      }
    </div>
  )
}

export default GuardianGallery
