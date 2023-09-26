import React, { useState, useEffect} from 'react';
import './index.css'

export default function LeaderboardBox ({ leaderboardData }) {

    function displayLeaderboard() {
      return leaderboardData.map((el, i) => 
        <tr className="leaderboard-row">
              <td>{i+1}</td>
              <td>{el['name']}</td>
              <td>{el['score']}</td>
        </tr>)
    }

    return (
      <div id="leaderboard-box">
        { leaderboardData && leaderboardData.length > 0 ? 
        <table id="leaderboard-table">
          <tbody>
          <tr className="leaderboard-header">
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          { displayLeaderboard() }
          </tbody>
        </table> 
        : 
        <table id="leaderboard-table">
          <tbody>
          <tr className="leaderboard-header">
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          <tr className="leaderboard-row">
            <td style={{width:'0'}}></td>
            <td className="cell-full-width">No Entries</td>
            <td style={{width:'0'}}></td>
          </tr>
          </tbody>
        </table>
        }
      </div>
      
    )
}