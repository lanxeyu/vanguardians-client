import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, render, cleanup, waitFor } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Header2 from '.'
import { AuthProvider } from '../../context/AuthProvider';

describe('Header2', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Header2 />
                </AuthProvider>
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

    it('navbar display "Home", "About", "Leaderboard", "Guardians", "Game", "Login", "Sign Up" ' , () => {
        const links = screen.getAllByRole('link');
        const texts = ["Home", "About", "Leaderboard", "Guardians", "Game", "Login", "Sign Up"];
        links.forEach((link, i) => {
            expect(link.textContent).toBe(texts[i]);
        });
    });

    it('home link to be active when loaded' , async () => {
        const link = screen.getByText('Home')
        expect(link).toHaveClass('active');
        expect(link).toHaveStyle({ textDecoration: 'underline' });
    });

    it('login link to be active when clicked' , async () => {
        const loginLink = screen.getByRole('link', { name: /login/i });
        expect(loginLink).not.toHaveClass('active');
        expect(loginLink).toHaveStyle({ textDecoration: 'none' });
        userEvent.click(loginLink)
        await waitFor(()=> {
            expect(loginLink).toHaveClass('active');
            expect(loginLink).toHaveStyle({ textDecoration: 'underline' });
        });
    });

    it('game link to be active when clicked and other links to not be active' , async () => {
        const gameLink = screen.getByRole('link', { name: /game/i });
        const homeLink = screen.getByRole('link', { name: /home/i });
        const loginLink = screen.getByRole('link', { name: /login/i });
        expect(gameLink).not.toHaveClass('active');
        expect(gameLink).toHaveStyle({ textDecoration: 'none' });
        userEvent.click(gameLink)
        await waitFor(()=> {
            expect(gameLink).toHaveClass('active');
            expect(gameLink).toHaveStyle({ textDecoration: 'underline' });
            expect(loginLink).not.toHaveClass('active');
            expect(loginLink).toHaveStyle({ textDecoration: 'none' });
            expect(homeLink).not.toHaveClass('active');
            expect(homeLink).toHaveStyle({ textDecoration: 'none' });
        });
    });

    it('home link to have href /' , () => {
        const link = screen.getByRole('link', { name: /home/i });
        expect(link.getAttribute('href')).toBe('/');
    });

    it('leaderboard link to have href /leaderboard' , () => {
        const link = screen.getByRole('link', { name: /leaderboard/i });
        expect(link.getAttribute('href')).toBe('/leaderboard');
    });

    it('guardians link to have href /guardians' , () => {
        const link = screen.getByRole('link', { name: 'Guardians' });
        expect(link.getAttribute('href')).toBe('/guardians');
    });

    it('game link to have href /game' , () => {
        const link = screen.getByRole('link', { name: /game/i });
        expect(link.getAttribute('href')).toBe('/game');
    });

    it('login link to have href /login' , () => {
        const link = screen.getByRole('link', { name: /login/i });
        expect(link.getAttribute('href')).toBe('/login');
    });
});
