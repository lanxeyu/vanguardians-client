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
    
    it('has three headings', () => {
        const element = screen.getAllByRole('heading');
        expect(element.length).toBe(3);
    });

    it('has a "HOME" title', () => {
        const title = screen.getByText('HOME');
        expect(title).toBeInTheDocument();
    });

    it('has a "DESCRIPTION OF GAME" subtitle', () => {
        const subtitle = screen.getByText('DESCRIPTION OF GAME');
        expect(subtitle).toBeInTheDocument();
    });

    it('has a "HOW TO PLAY" subtitle', () => {
        const subtitle = screen.getByText('HOW TO PLAY');
        expect(subtitle).toBeInTheDocument();
    });

    it('display popup when "DESCRIPTION OF GAME" is clicked and popup has a button to close popup when clicked', () => {
        const description = screen.getByText('DESCRIPTION OF GAME');
        const descriptionPopup = screen.queryByTestId('description-popup');
        expect(descriptionPopup).not.toBeInTheDocument();
        fireEvent.click(description); 
        const updatedDescriptionPopup = screen.getByTestId('description-popup');
        const button = screen.getByRole('button');
        expect(updatedDescriptionPopup).toBeInTheDocument();
        expect(button).toBeTruthy();
        fireEvent.click(button)
        expect(updatedDescriptionPopup).not.toBeInTheDocument();
    });

    it('display popup when "HOW TO PLAY" is clicked and popup has a button to close popup when clicked', () => {
        const howToPlay = screen.getByText('HOW TO PLAY');
        const howToPlayPopup = screen.queryByTestId('howtoplay-popup');
        expect(howToPlayPopup).not.toBeInTheDocument();
        fireEvent.click(howToPlay);
        const updatedHowToPlayPopup = screen.queryByTestId('howtoplay-popup');
        const button = screen.getByRole('button');
        expect(updatedHowToPlayPopup).toBeInTheDocument();
        expect(button).toBeTruthy();
        fireEvent.click(button)
        expect(updatedHowToPlayPopup).not.toBeInTheDocument();
    });

    it('display six images', () => {
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(6);
    });
});
