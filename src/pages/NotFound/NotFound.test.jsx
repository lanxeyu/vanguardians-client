import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NotFound from '.'

describe('NotFound page', () => { 
    beforeEach(() => {
        render(
          <MemoryRouter>
            <NotFound />
          </MemoryRouter>
        );
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('has a heading', () => {
        const element = screen.getByRole('heading');
        expect(element).toBeInTheDocument();
    });

    it('has a link to homepage', () => {
        const link = screen.getByRole('link', { name: /Return to homepage/i });
        expect(link).toBeInTheDocument();
    });
});
