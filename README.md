# Playwright UI Test Automation Project

## Purpose

This personal project is aimed at building practical skills in **UI test automation** with **Playwright**.

It was created as part of a skills development effort to complement an existing background in **software quality**, **test design**, and **test strategy**.

## Tech stack

- Playwright
- TypeScript
- Node.js / npm
- Git / GitHub
- GitHub Actions
- VS Code

## Covered scenarios

The project uses _The Internet_ demo website and covers several common UI testing scenarios, including:

- login / logout
- forms
- dropdowns
- checkboxes
- dynamic add / remove actions
- enable / disable controls
- dynamic loading
- JavaScript dialogs (`alert`, `confirm`, `prompt`)
- keyboard interactions
- random notification messages

## Project structure

Tests are organized by functional topic inside the `tests/` folder.

The project uses:

- `test.describe(...)` to group related tests
- `beforeEach(...)` for shared setup
- simple helper functions for repeated actions
- Playwright locators such as:
  - `getByRole(...)`
  - `getByLabel(...)`
  - `locator(...)`

## Run the tests

From the project root:

npm test

Playwright UI mode:

npm run test:ui

Headed mode:

npm run test:headed

Debug mode:

npm run test:debug
What I worked on

This project helped me practice:

writing UI test scenarios
choosing robust locators
handling dynamic page states
understanding the difference between text, input value, and element state
using async / await correctly
refactoring and organizing test code
running tests locally and through GitHub Actions
