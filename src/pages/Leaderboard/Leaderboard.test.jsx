import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers);

import Leaderboard from '.';


describe("Leaderboard Page", () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Leaderboard />
            </BrowserRouter>
            
        );
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

    

});