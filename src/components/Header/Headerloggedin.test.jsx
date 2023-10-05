import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, render, cleanup } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Header from '.'
import { AuthProvider } from '../../context/AuthProvider';
  
describe('Header when logged in', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <Header />
                </AuthProvider>
            </MemoryRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('display logout when logged in' , async () => {
        vi.mock("../../context/AuthProvider", async () => {
            const actual = await vi.importActual("../../context/AuthProvider");
            return {
                ...actual,
                useAuth: () => ({
                user: 'user'
                })
            };
        });

        const link = screen.getByRole('link', { name: /logout/i });
        expect(link).toBeTruthy()
    });
});


