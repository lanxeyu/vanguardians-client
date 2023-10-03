import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers);

import LeaderboardBox from '.';



describe("Leaderboard Page", () => {

    beforeEach(() => {
        render(
            <LeaderboardBox leaderboardData={[]} />
            
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

    

    

});