import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// import axios from 'axios'

import Guardians from '.'

describe('GuardiansPage', () => { 
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

  it('displays GUARDIANS title', () => {
    const title = screen.getByText('GUARDIANS')
    expect(title).toBeInTheDocument();
  })

  // it('displays 6 images', () => {
  //   const gallery = document.getAllByRole('img');
  //   expect(gallery.length).toBe(6);
  // })

  // it('displays atleast 6 cards', () => {
  //   const cards = screen.findAllByRole('div.guardians-card');

  //   expect(cards.length).toBe(6);
  // })

  // it('displays 1 guardian card if the API returns only one card', async() => {

  //   vi.spyOn(axios, 'get').mockResolvedValueOnce({
  //     data: [
  //       {
  //         "g_id": 1,
  //         "name": "TestGuardian",
  //         "g_class": "Wizard"
  //       }
  //     ]
  //   })

  //   render(<Guardians />)

  //   const guardianCards = await screen.findAllByRole('div')

  //   expect(guardianCards.length).toBe(1)
  // })
})
