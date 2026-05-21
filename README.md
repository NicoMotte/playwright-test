# Avant-propos (Français): leçons tirées de ce projet

L’automatisation de tests permet d’industrialiser des vérifications répétitives qu’il serait coûteux, lent ou absurde de refaire manuellement à chaque évolution du produit. Elle prend donc une valeur particulière dans une logique de non-régression et d’intégration continue, en particulier sur les projets de taille significative.

En revanche, une suite de tests automatisés ne garantit pas, à elle seule, la qualité du produit. Sa valeur dépend de la pertinence des cas choisis, de la qualité des assertions, de la robustesse des sélecteurs et de son entretien dans le temps. Une base de tests automatisés peut donner une impression trompeuse de couverture si elle vieillit sans être réajustée aux évolutions réelles du produit et de ses risques.

L’automatisation ne remplace donc pas le test manuel. Elle permet surtout de libérer du temps sur les vérifications répétitives pour concentrer davantage l’effort manuel sur l’exploration, l’analyse, les comportements inattendus et la remise en question de la couverture existante.

Le projet m’a aussi montré que l’automatisation est plus efficace quand la testabilité du produit est pensée tôt : structure du DOM, stabilité des identifiants, qualité des locators possibles, clarté des états d’interface, collaboration entre développeurs et testeurs. Sur un produit en cours de développement, l’automatisation reste possible, mais elle devient plus rentable lorsque l’équipe prend en compte explicitement les besoins de testabilité et de maintenabilité.

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
