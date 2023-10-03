import React from 'react'
import { GuardianCard } from '..'
import'./index.css'

const GuardianGallery = ({ guardians }) => {
  const guardianArr = guardians.guardians
  return (
    <>
      {
        guardianArr.map(guardian => <GuardianCard key={guardian.g_id} guardian={guardian} />)
      }
    </>
  )
}

export default GuardianGallery
