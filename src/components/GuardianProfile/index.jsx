import React, { useEffect, useState} from 'react'
import './index.css'
// import { useNavigate } from 'react-router-dom'


const GuardianProfile = ({ guardian }) => {
  // const navigate = useNavigate
  const g = guardian.data
  const [imgUrl, setImgUrl] = useState("")
  useEffect(() => {
    switch(g.name){
      case 'Duncan':
        setImgUrl("\\src\\pages\\Home\\images\\heavyarmor.gif");
        break;
      case 'James':
        setImgUrl("\\src\\pages\\Home\\images\\fireworm.gif");
        break;
      case 'Stephanie':
        setImgUrl("\\src\\pages\\Home\\images\\huntress.gif");
        break;
      case 'Alex':
        setImgUrl("\\src\\pages\\Home\\images\\fantasywarrior.gif");
        break;
      case 'Robbie':
        setImgUrl("\\src\\pages\\Home\\images\\wizard.gif");
        break;
      case 'Lanxe':
        setImgUrl("\\src\\pages\\Home\\images\\martialhero.gif");
        break;
    }
  }, [])
  console.log(imgUrl)
  return (
    <>
    <div className="guardian-profile" id="guardian-profile-container">
      <div className="guardian-profile-card">
        <h4>{g.name}</h4>
        <h5>Type: {g.g_class}</h5>
        <img src={imgUrl} alt={g.name} />
      </div>

      <div className="guardian-profile-card" id='card-2'>
        <div className="prof-section" id='about'>
          <h3>About:</h3>
          <p>{g.about}</p>
        </div>
        <div className="prof-section" id='attack-type'>
          <h3>Attack type:</h3>
          <p>{g.attack_type}</p>
        </div>
        
      </div>
    </div>
    </>
        
  )
}

export default GuardianProfile
