import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Guardian from '.'

describe('Guardians Page', () => { 
  beforeEach(() => {
      render(
        <MemoryRouter>
          <Guardian />
        </MemoryRouter>
      );
  });

  afterEach(() => {
    cleanup();
  });
  
  it('displays Loading...'), () => {
    const element = screen.getByText('Loading...')
    expect(element).toBeInTheDocument();
  }
})
