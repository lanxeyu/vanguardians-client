import React, { useState, useEffect } from 'react'
import LeaderboardBox from '../../components/LeaderboardBox'

import './index.css'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(`https://vanguardians-server.onrender.com/scores`);
      if (response.status === 200) {
          const data = await response.json();
          setLeaderboardData(data);      
      }
    } catch (error) {
        console.error('Error fetching data:', error);
        setLeaderboardData([])
      //   setLeaderboardData([{
      //     'name': 'Simon',
      //     'score': 20000
      //   },
      //   {
      //     'name': 'Daniel',
      //     'score': 5500
      //   }
      // ]);
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

export {
  Leaderboard
}