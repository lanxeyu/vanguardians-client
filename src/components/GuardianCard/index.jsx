import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const GuardianCard = ({ guardian }) => {
  const [imgUrl, setImgUrl] = useState("")
  
  useEffect(() => {
    switch(guardian.name){
      case 'Duncan':
        setImgUrl("src\\pages\\Home\\images\\heavyarmor.gif");
        break;
      case 'James':
        setImgUrl("src\\pages\\Home\\images\\fireworm.gif");
        break;
      case 'Stephanie':
        setImgUrl("src\\pages\\Home\\images\\huntress.gif");
        break;
      case 'Alex':
        setImgUrl("src\\pages\\Home\\images\\fantasywarrior.gif");
        break;
      case 'Robbie':
        setImgUrl("src\\pages\\Home\\images\\wizard.gif");
        break;
      case 'Lanxe':
        setImgUrl("src\\pages\\Home\\images\\martialhero.gif");
        break;
    }
  }, [])

  return (
    <Link to={`${guardian.g_id}`}>
      <div className = "guardian-card">
        <h1>{guardian.name}</h1>
        <h2>Type: {guardian.g_class}</h2>
        <img src={imgUrl} alt={guardian.name} />
      </div>
    </Link>
  )
}

export default GuardianCard
