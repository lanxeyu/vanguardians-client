import React from "react";
import { describe, it, expect, beforeEach, test, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { MemoryRouter } from "react-router-dom";
expect.extend(matchers);

import Signup from ".";
import { clean } from "gh-pages";

describe("Signup Page", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it("Has an h1 present and displaying 'Register'", () => {
        const elem = document.getElementsByClassName("register")[0];
        expect(elem).toBeInTheDocument();
        expect(elem.textContent).toBe("Register");
    });

    it("Has a form", () => {
        const elem = document.getElementById("register-form");
        expect(elem).toBeInTheDocument();
    });

    it("Has a button", () => {
        const elem = screen.getByTestId("reg-btn");
        expect(elem).toBeInTheDocument();
    });
});
