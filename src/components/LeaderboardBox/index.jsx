import React, { useState, useEffect} from 'react';
import './index.css'

export default function LeaderboardBox ({ leaderboardData }) {

    function displayLeaderboard() {
      return leaderboardData.slice(0, 10).map((el, i) => 
        <tr key={'leaderboard-item-' + i} className="leaderboard-row">
              <td>{i+1}</td>
              <td>{el['username']}</td>
              <td>{el['value']}</td>
        </tr>)
    }

    return (
      <div id="leaderboard-box">
        { leaderboardData && leaderboardData.length > 0 && leaderboardData[0] !== -1 ? 
        <table id="leaderboard-table">
          <tbody>
          <tr key={'leaderboard-header-row'} className="leaderboard-header">
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          { displayLeaderboard() }
          </tbody>
        </table> 
        : 

        leaderboardData[0] === -1 && leaderboardData.length == 1 ? 
        <table id="leaderboard-table">
        <tbody>
        <tr className="leaderboard-header">
          <th>#</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        <tr key={'leaderboard-header-row'} className="leaderboard-row">
          <td style={{width:'0'}}></td>
          <td className="cell-full-width">Loading...</td>
          <td style={{width:'0'}}></td>
        </tr>
        </tbody>
      </table> : 
        <table id="leaderboard-table">
          <tbody>
          <tr className="leaderboard-header">
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          <tr key={'leaderboard-header-row'} className="leaderboard-row">
            <td style={{width:'0'}}></td>
            <td className="cell-full-width">No Scores</td>
            <td style={{width:'0'}}></td>
          </tr>
          </tbody>
        </table>
        }
      </div>
      
    )
}