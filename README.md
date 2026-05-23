# Avant-propos (Français): leçons tirées de ce projet

L'automatisation de tests permet d'industrialiser des vérifications répétitives qu'il serait coûteux, lent ou absurde de refaire manuellement à chaque évolution du produit. Elle prend donc une valeur particulière dans une logique de non-régression et bien sûr de l'intégration continue, en particulier sur les projets de taille significative.
L'automatisation permet aussi la libération du poids des tâches répétitives. J'ai moi-même constaté lors de mon expérience dans la validation des commandes de vol chez Airbus que l'automatisation des analyses de non-regréssion aboutissait non seulement à un temps de livraison nettement plus court (de l'ordre de 60% de réduction) mais également à de meilleures analyses en cas de régression. Le temps supplémentaire dégagé incitait naturellement à des analyses plus approfondies.

En revanche, une suite de tests automatisés ne garantit pas, à elle seule, la qualité du produit. Une base de tests automatisés peut donner une impression trompeuse de couverture si elle vieillit sans être réajustée aux évolutions réelles du produit et de ses risques. Comme tout produit, elle reste également sujette aux oublis et aux erreurs de conception. Dans les organisations très cadrées, une communication insuffisante entre les utilisateurs et les équipes de développement peut créer un décalage entre le besoin réel et le produit effectivement livré.

L'automatisation ne remplace donc pas le test manuel. Elle permet surtout de libérer du temps pour concentrer davantage l'effort manuel sur l'exploration, l'analyse, les comportements inattendus et la remise en question de la couverture existante.

C'est précisément pour cela que j'ai voulu combler mon manque en automatisation : non pas pour opposer test manuel et test automatique, mais pour mieux piloter leur complémentarité. Avec mon expérience de test manuel et mon socle ISTQB Test Manager, l'automatisation me paraît présenter un bon retour sur investissement. Il faut juste rester lucide sur ses limites.

Le projet m'a montré que l'automatisation est plus efficace quand la testabilité du produit est pensée tôt. Dans le cas d'une page web, il s'agit par exemple de la structure du DOM, la stabilité et l'unicité des identifiants, la qualité des locators possibles, la clarté des états d'interface... Sur un produit en cours de développement, l'automatisation reste possible, mais elle devient plus rentable lorsque l'équipe prend en compte explicitement les besoins de testabilité et de maintenabilité.

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
