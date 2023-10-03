import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers);

import initCanvas from './../lib/canvas';

describe("Canvas", () => {

    beforeEach(() => {
        render(
            
            
        );
    });

    afterEach(() => {
        cleanup();
    })

    it("Does this leaderboard box have a container?", async () => {
        initCanvas()
        
    })

    

});