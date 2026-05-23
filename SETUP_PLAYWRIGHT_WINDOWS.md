# SETUP_PLAYWRIGHT_WINDOWS - Checklist

1. Install **VS Code**
2. Install **Git**
3. Install **Node.js** (npm comes with it)
4. Check:
   node -v
   npm -v
   git --version
5. If `node` / `npm` is not recognized, fix the shell / PowerShell profile first
6. Open the project folder in VS Code
7. Run:
   npm install
8. If Playwright browsers are missing:
   npx playwright install
9. Run the tests:
   npm test
10. UI mode:
    npm run test:ui
11. Headed mode:
    npm run test:headed
12. Debug mode:
    npm run test:debug
13. If Git is not initialized:
    git init
14. Configure Git identity if needed:
    git config --global user.name "Your Name"
    git config --global user.email "your@email.com"
15. First commit:
    git add .
    git commit -m "Initial Playwright setup"
16. If needed, connect to GitHub and push
17. Check GitHub Actions after push
18. If `process` is not recognized in TypeScript, verify `tsconfig.json`
19. Use `await page.pause()` and `console.log(...)` for debugging
20. If a test behaves strangely, also verify the exact URL (including trailing slash)
