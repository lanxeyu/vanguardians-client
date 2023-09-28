import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers);

import LeaderboardBox from '.';

vi.mock('axios')

describe("Leaderboard Page", () => {

    beforeEach(() => {
        render(
            <LeaderboardBox />
            
        );
    });

    afterEach(() => {
        cleanup();
    })

    it("Does this leaderboard box have a container?", async () => {
        const elem = document.getElementById('leaderboard-box');
        expect(elem).toBeInTheDocument();
    })

    it("Does a table exist in the leaderboard box?", async () => {
        const elem = document.getElementById('leaderboard-table');
        expect(elem).toBeInTheDocument();
    })

    it("Displays and fetches leaderboard data from the server when the fetch is a success", async () => {
        const mockData = [{
            'name': 'Robbie',
            'score': 2000
        },
        {
            'name': 'Jack',
            'score': 1000
        }
        ]

        axios.get.mockResolvedValue({

        })

        const scores =  
    })

    

});