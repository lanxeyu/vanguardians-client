import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import GuardianCard from '.'
import { MemoryRouter } from 'react-router-dom';

const guardian = {
  g_id: 1,
  name: "Robbie",
  about: "",
  g_class: "Wizard",
  attack_type: "Ranged",
  sprite: "https://img.example.gif"
}

describe ('GuardianCard Component', () => { 
  beforeEach(() => {
      render(
      <MemoryRouter>
        <GuardianCard guardian={guardian} />
      </MemoryRouter>
      );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the Link container for the guardian card', () => {
    const link = document.getElementById('guardian-card-link')
    expect(link).toBeInTheDocument();
  })

  it('renders the container div inside of the Link', () => {
    const container = document.getElementById('guardian-card-container')
    expect(container).toBeInTheDocument()
  })

  it('renders the guardian name and it is correct', () => {
    const gName = screen.getByRole('heading', {level: 4})
    expect(gName).toBeInTheDocument()
    expect(gName.textContent).toBe('Robbie')
  })

  it('renders the guardian class and it is correct', () => {
    const gClass = screen.getByRole('heading', {level: 5})
    expect(gClass).toBeInTheDocument()
    expect(gClass.textContent).toBe('Type: Wizard')
  })

  it('renders 1 image', () => {
    const image = screen.getAllByRole('img')
    expect(image.length).toBe(1)
  })

  it('renders Robbie\'s img src when the guardian name is Robbie', () => {
    const image = screen.getByRole('img')
    expect(image.src).toBe("http://localhost:3000/src/pages/Home/images/wizard.gif")
  })

  it('renders Duncan\'s img src when the guardian name is Duncan', () => {
    guardian.name = "Duncan"
    const image = screen.getByRole('img')
    expect(image.src).toBe("http://localhost:3000/src/pages/Home/images/heavyarmor.gif")
  })
  

})
