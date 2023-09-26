import React, { useState, useEffect } from 'react'
import LeaderboardBox from '../../components/LeaderboardBox'

import './index.css'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/leaderboard`);
      if (response.status === 200) {
          const data = await response.json();
          setLeaderboardData(data);      
      }
    } catch (error) {
        console.error('Error fetching data:', error);
        setLeaderboardData([{
          'name': 'Simon',
          'score': 20000
        },
        {
          'name': 'Daniel',
          'score': 5500
        }
      ]);
    }
  }

  useEffect(() => {
    fetchLeaderboardData()

  }, []);

  return (
    <div id="leaderboard-container">
      <h2 id="leaderboard-title">LEADERBOARD</h2>
      <LeaderboardBox leaderboardData={leaderboardData} ></LeaderboardBox>
    </div>
  )
}

export default Leaderboard