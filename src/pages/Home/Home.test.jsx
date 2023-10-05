import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Home from '.'

describe('Homepage', () => { 
    beforeEach(() => {
        render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('has two headings', () => {
        const element = screen.getAllByRole('heading');
        expect(element.length).toBe(2);
    });

    it('has a title', () => {
        const title = document.getElementById('homepage-title');
        expect(title).toBeInTheDocument();
        expect(title.textContent).toBe('Vanguardians')
    });

    it('has a "HOW TO PLAY" subtitle', () => {
        const subtitle = screen.getByText('HOW TO PLAY');
        expect(subtitle).toBeInTheDocument();
    });

    it('display popup when "HOW TO PLAY" is clicked and popup has a button to close popup when clicked', () => {
        const howToPlay = screen.getByText('HOW TO PLAY');
        const howToPlayPopup = screen.queryByTestId('howtoplay-popup');
        expect(howToPlayPopup).not.toBeInTheDocument();
        fireEvent.click(howToPlay);
        const updatedHowToPlayPopup = screen.queryByTestId('howtoplay-popup');
        const button = document.getElementById('close-button');
        expect(updatedHowToPlayPopup).toBeInTheDocument();
        expect(button).toBeTruthy();
        fireEvent.click(button)
        expect(updatedHowToPlayPopup).not.toBeInTheDocument();
    });

    it('has a play now button that link to gamepage', () => {
        const button = document.getElementById('play-button');
        const link = screen.getByRole('link', { name: /play now!/i });
        expect(button).toBeTruthy();
        expect(link).toBeTruthy();
        expect(link.getAttribute('href')).toBe('/game');
    });

    it('display seven images', () => {
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(7);
    });
});
