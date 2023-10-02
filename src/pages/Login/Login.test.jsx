import React from "react";
import { describe, it, expect, beforeEach, test, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouter } from "react-router-dom";
expect.extend(matchers);

import Login from ".";
import { clean } from "gh-pages";

describe("Login Page", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("Has an h1 present and displaying 'Sign In'", () => {
        const elem = document.getElementsByClassName("signin")[0];
        expect(elem).toBeInTheDocument();
        expect(elem.textContent).toBe("Sign In");
    });

    it("Has a form", () => {
        const elem = document.getElementById("login-form");
        expect(elem).toBeInTheDocument();
    });

    it("Has a button", () => {
        const elem = screen.getByTestId("login-btn");
        expect(elem).toBeInTheDocument();
    });
});
