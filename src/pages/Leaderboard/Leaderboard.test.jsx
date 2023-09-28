import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers);

import Leaderboard from '.';

vi.mock('axios')

describe("Leaderboard Page", () => {
    const renderComponent = () => (
    render(<BrowserRouter>
                <Leaderboard />
            </BrowserRouter>)
    );

    beforeEach(() => {
        const renderComponent = () => (
            render(<BrowserRouter>
                        <Leaderboard />
                    </BrowserRouter>)
        );
        // render(
        //     <BrowserRouter>
        //         <Leaderboard />
        //     </BrowserRouter>
            
        // );
    });

    afterEach(() => {
        cleanup();
    })

    it("Has a container for the leaderboard", async () => {
        const elem = document.getElementById('leaderboard-container');
        expect(elem).toBeInTheDocument();
    })

    it("Displays a heading for the title", async () => {
        const elem = document.getElementById('leaderboard-title');
        expect(elem).toBeInTheDocument();
        expect(elem.textContent).toBe('LEADERBOARD');
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
            mockData
        })

        await waitFor(() => {

        })
    })

});