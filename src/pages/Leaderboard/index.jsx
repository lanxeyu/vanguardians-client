import React, { useState, useEffect } from 'react'
import LeaderboardBox from '../../components/LeaderboardBox'
import axios from 'axios'
import { useAuth } from "../../context/AuthProvider";

import './index.css'

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([-1])
  const { setUser, user } = useAuth();

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(`https://vanguardians-server.onrender.com/scores`);
      // console.log('Middle')
      if (response.status === 200) {
          const data = response.data;
          
          console.log(data)
          setLeaderboardData(data);      
      }
      else {
        throw response.status;
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
      <LeaderboardBox leaderboardData={leaderboardData}></LeaderboardBox>
    </div>
  )
}

export default Leaderboard