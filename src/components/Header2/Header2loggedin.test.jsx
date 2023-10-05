import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, render, cleanup } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import Header2 from '.'
import { AuthProvider } from '../../context/AuthProvider';
  
describe('Header2 when logged in', () => {
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


