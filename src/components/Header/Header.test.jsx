import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, render, cleanup, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Header from '.'

describe('Header', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('displays a header', () => {
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    });

    it('has navigation', () => {
        const nav = screen.getByRole('navigation');
        expect(nav).toBeInTheDocument();
    });
    
    it('has seven nav links', () => {
        const links = screen.getAllByRole('link');
        expect(links.length).toBe(7);
    });

    it('nav links display "VanGuardians", "Home", "Leaderboard", "Guardians", "Game", "Login", "Sign Up" ' , () => {
        const links = screen.getAllByRole('link');
        const texts = ["VanGuardians", "Home", "Leaderboard", "Guardians", "Game", "Login","Sign Up"];
        links.forEach((link, i) => {
            expect(link.textContent).toBe(texts[i]);
        });
    });

    it('home link to be active when loaded' , async () => {
        const link = screen.getByText('Home')
        expect(link).toHaveClass('active');
        expect(link).toHaveStyle({ textDecoration: 'underline' });
    });

    it('signup link to be active when clicked' , async () => {
        const signupLink = screen.getByText('Sign Up')
        expect(signupLink).not.toHaveClass('active');
        expect(signupLink).toHaveStyle({ textDecoration: 'none' });
        userEvent.click(signupLink)
        await waitFor(()=> {
            expect(signupLink).toHaveClass('active');
            expect(signupLink).toHaveStyle({ textDecoration: 'underline' });
        });
    });

    it('game link to be active when clicked and other links to not be active' , async () => {
        const gameLink = screen.getByText('Game')
        const homeLink = screen.getByText('Home')
        const signupLink = screen.getByText('Sign Up')
        expect(gameLink).not.toHaveClass('active');
        expect(gameLink).toHaveStyle({ textDecoration: 'none' });
        userEvent.click(gameLink)
        await waitFor(()=> {
            expect(gameLink).toHaveClass('active');
            expect(gameLink).toHaveStyle({ textDecoration: 'underline' });
            expect(signupLink).not.toHaveClass('active');
            expect(signupLink).toHaveStyle({ textDecoration: 'none' });
            expect(homeLink).not.toHaveClass('active');
            expect(homeLink).toHaveStyle({ textDecoration: 'none' });
        });
    });

});
