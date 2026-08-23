Automated UI test suite for Demowebshop, a sample e-commerce site, built with Playwright and TypeScript using the Page Object Model (POM) design pattern for maintainable, reusable test code.
Tech Stack
Language: TypeScript
Framework: Playwright Test
Design Pattern: Page Object Model
What's Covered
User registration and login/logout
Product search and category navigation
Add to cart / update cart quantity / remove from cart
Checkout flow (guest and registered user)
Form validation and error message handling
Project Structure
```
demowebshop-POM/
├── pages/          # Page Object classes (LoginPage, CartPage, CheckoutPage, etc.)
├── tests/          # Test specs, organized by feature
├── fixtures/       # Custom Playwright fixtures (e.g., authenticated state)
├── playwright.config.ts
└── package.json
```
Each page object encapsulates the locators and actions for a single page, so test specs read as plain, readable steps rather than raw selectors.
How to Run
```bash
# install dependencies
npm install

# install Playwright browsers (first time only)
npx playwright install

# run the full suite
npx playwright test

# run in headed mode (watch it run)
npx playwright test --headed

# run a single spec
npx playwright test tests/checkout.spec.ts

# view the HTML report after a run
npx playwright show-report
```
Test Report
Playwright generates a built-in HTML report after each run (`npx playwright show-report`) with pass/fail status, execution time, and traces/screenshots for any failures.
Next Steps
Add data-driven test cases (multiple product/user combinations via fixtures)
Integrate with GitHub Actions for CI on every push
Add visual regression checks for key pages
