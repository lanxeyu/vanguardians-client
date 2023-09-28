import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const location = useLocation()

  return (
    <>
      <h2 id='notfound'>
        Page <span id='span-text'>{location.pathname}</span> not found...
      </h2>
      <Link id='notfound-home-link' to="/"> 
        Return to homepage &rarr;
      </Link>
    </>
  )
}

export default NotFound
