import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers);

import Leaderboard from '.';

vi.mock('axios')


describe("Leaderboard Page", () => {

    beforeEach(() => {
        
    });

    afterEach(() => {
        cleanup();
    })

    it("Has a container for the leaderboard", async () => {
        render(
            <MemoryRouter>
                <Leaderboard />
            </MemoryRouter>
        );
        const elem = document.getElementById('leaderboard-container');
        expect(elem).toBeInTheDocument();
    })

    it("Displays a heading for the title", async () => {
        render(
            <MemoryRouter>
                <Leaderboard />
            </MemoryRouter>
        );
        const elem = document.getElementById('leaderboard-title');
        expect(elem).toBeInTheDocument();
        expect(elem.textContent).toBe('LEADERBOARD');
    })

    it("Displays and fetches leaderboard data from the server when the fetch is a success", async () => {

        const mockData = [{
            'username': 'Robbie',
            'value': 2000
        },
        {
            'username': 'Jack',
            'value': 1000
        }]
        
        vi.spyOn(axios, "get").mockResolvedValueOnce({ status: 200, data: mockData });

        render(
            <MemoryRouter>
                <Leaderboard />
            </MemoryRouter>
            
        );

        await waitFor(async () => {
            // console.log(await screen.findByRole('table'))
            const tableValue = await screen.findByText('Robbie')
            expect(tableValue).toBeInTheDocument()
        }, { timeout: 5000 })
    }, 5000)

    it("Displays No Scores when fetching leaderboard data from the server results in a failure", async () => {
        vi.spyOn(axios, "get").mockResolvedValueOnce({ status: 500 });

        render(
            <MemoryRouter>
                <Leaderboard />
            </MemoryRouter>
            
        );

        await waitFor(async () => {
            // console.log(await screen.findByRole('table'))
            const tableValue = await screen.findByText('No Scores')
            expect(tableValue).toBeInTheDocument()
        }, { timeout: 5000 })
    }, 5000)
});