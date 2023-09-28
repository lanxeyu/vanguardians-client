import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios'
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Guardians from '.'

describe('Guardians Page', () => { 
  beforeEach(() => {
      render(
        <MemoryRouter>
          <Guardians />
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

  it('has a title(h1) and the text content is GUARDIANS', () => {
      const element = document.getElementById('guardians-title');
      expect(element).toBeInTheDocument();
      expect(element.textContent).toBe('GUARDIANS')
  });

  // it("renders guardian data", async () => {
      
  //   vi.spyOn(axios, 'get').mockResolvedValueOnce({
  //     data: {guardians: [
  //       {
  //         "g_id": 1,
  //         "name": "Roberto",
  //         "about": "",
  //         "g_class": "Wizard",
  //         "attack_type": "Ranged",
  //         "sprite": "https://img.example.gif"
  //       }
  //     ]}
  //   });

  //   render(<Guardians />)


  // })
})
