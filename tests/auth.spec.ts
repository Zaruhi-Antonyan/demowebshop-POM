import {test, expect, type Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {BasePage} from '../pages/BasePage';
import { loginAs, logout } from '../helpers/auth';


const BASE_URL = 'https://demowebshop.tricentis.com';
const LOGIN_URL = `${BASE_URL}/login`;
const ACCOUNT_PAGE = `${BASE_URL}/customer/info`;

const VALID_USER = {
    email: 'zaraantonyan@yahoo.com',
    password: 'demowebshop'
};

const VALID_USER2 = {
    email: 'ZARAANTONYAN@YAHOO.COM',
    password: 'demowebshop'
};

const SELECTORS = {
    
    emailInput: '#Email',
    passwordInput: '#Password',
    loginButton: 'input.login-button',
    heading: '.page-title h1',
    rememberMeCheck: '#RememberMe',
    registerButton: 'input.register-button',                      
    header: '.header',
    logoutLink: '.ico-logout',
    validationError: '.validation-summary-errors',
    emailValidationError: '.field-validation-error'              
};


test.describe('Positive Scenarios', () => {

    let loginPage: LoginPage;
    let basePage: BasePage;

    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        basePage = new BasePage(page);
        await loginPage.open();
    });
 

    test('P-01| Login page loads correctly' , async({page})=>{
        
        await basePage.expectWeAreOnCorrectPage('Welcome, Please Sign In!', '/login', 'Demo Web Shop. Login');
    });


    test('P-02 | Login form contains all required fields', async({page})=> {
        
        await expect(page.locator(SELECTORS.emailInput), 'Email field should be displayed').toBeVisible();
        await expect(page.locator(SELECTORS.passwordInput), 'Password field should be displayed').toBeVisible();
        await expect(page.locator(SELECTORS.loginButton), 'Login Button should be displayed').toBeVisible();

        await expect(page.locator(SELECTORS.emailInput), 'Email field should be enabled').toBeEnabled();
        await expect(page.locator(SELECTORS.passwordInput), 'Password field should be enabled').toBeEnabled();
        await expect(page.locator(SELECTORS.loginButton), 'Login Button should be enabled').toBeEnabled();
    });


    test('P-03 | Login form contains "Remember me" checkbox', async({page})=> {
        
        await expect(page.locator(SELECTORS.rememberMeCheck)).toBeVisible();
        await expect(page.locator(SELECTORS.rememberMeCheck)).toBeEnabled();
    });


    test('P-04 | "Forgot Password" link redirects to "Password recovery" page', async({page}) => {
        
        await test.step('Click on Forgot password link', async() => {
            await page.getByRole('link',{ name : 'Forgot password?'}).click(); 
        });

        await test.step('User is redirected to "Password recovery" page', async() => {  
            await basePage.expectWeAreOnCorrectPage('Password recovery', '/passwordrecovery', 'Demo Web Shop. Password Recovery');
        });
    });


    test('P-05 | "Register" link redirects to registration page', async({page})=> {
        
        await test.step('Click on Register link', async()=> {  
            await page.locator(SELECTORS.registerButton).click();
        });

        await test.step('User is redirected to "Register" page', async() => {  
            await basePage.expectWeAreOnCorrectPage('Password recovery', '/passwordrecovery', 'Demo Web Shop. Password Recovery');
        });
    });


    test('P-06 | Login with valid credentials', async({page}) => {
        
        await test.step('Fill valid credentials and login', async()=>{
            await loginAs(page, VALID_USER.email, VALID_USER.password);
        });

        await test.step('Expect Login is successful', async() => {
            await loginPage.expectLoginIsSuccessful();
        });
    });


    test('P-07 | Log out', async({page}) => {
        
        await test.step('Fill valid credentials and login', async() => {
            await loginAs(page, VALID_USER.email, VALID_USER.password);
        });

        await test.step('Click on "log out" link', async() => {
            await logout(page);
        });

        await test.step('User is redirected to homepage', async() => {
            await expect(page).toHaveURL(BASE_URL);
            await expect(page.locator(SELECTORS.logoutLink)).toHaveCount(0);
        });
    });


    test('P-08 | Second login is succesful', async({page}) => {
        
        await test.step('Login with valid credentials', async() => {
            await loginAs(page, VALID_USER.email, VALID_USER.password);
        });

        await test.step('Expect Login is successful', async() => {
            await loginPage.expectLoginIsSuccessful();
        });

        await test.step('Log out', async() => {
            await logout(page);
        });

        await test.step('Expect Log out is successful', async() => {
            await loginPage.expectLogout();
        });

        await test.step('Second login with valid credentials', async() => {
            await loginPage.open();
            await loginAs(page, VALID_USER.email, VALID_USER.password);
        });

        await test.step('Expect Login is successful', async() => {
            await loginPage.expectLoginIsSuccessful();
        });

        await test.step('Log out', async() => {
            await logout(page);
        });

        await test.step('Expect Log out is successful', async() => {
            await loginPage.expectLogout();
        });
    });


    test('P-09 | Field Password hides entered password (type=password)', async({page}) => {
        const passwordInput = page.locator(SELECTORS.passwordInput);

        await expect(passwordInput, 'Type of password field should be password').toHaveAttribute('type', 'password');
    });


    test('P-010 | CheckBox "Remember me" can be checked and unchecked', async({page})=>{
        const rememberMe = page.locator(SELECTORS.rememberMeCheck);
    
        await test.step('Check the Checkbox', async() => {
            await rememberMe.check();
            await expect(rememberMe).toBeChecked();
        });
    
        await test.step('UnCheck the Checkbox', async() => {
            await rememberMe.uncheck();
            await expect(rememberMe).not.toBeChecked();
        });
    });
});

test.describe('Negative Scenarios', () => {
    
    let loginPage: LoginPage;
    
    test.beforeEach(async({page})=>{
        loginPage = new LoginPage(page);
        await loginPage.open();
    });


    test('N-01 | Sending Empty form - should show validation error', async({page}) => {
    
        await test.step('Click to "Log In" without required fields', async() => {
            await loginAs(page, '', '');
        });
    
        await test.step('Expect WE stay on /login, and display error message', async()=>{
            await loginPage.expectInvalidLogin('No customer account found');
        });
    });
    
    test('N-02 | Only Email - without password', async({page})=>{
    
        await test.step('Login without password', async()=>{
            await loginAs(page,  VALID_USER.email, '');
        });
    
        await test.step('Expect URL and ERROR text', async()=>{
            await loginPage.expectInvalidLogin('The credentials provided are incorrect');
        });
    });
    
    
    test('N-03 | Only Password - without email', async({page})=>{
        await test.step('Login without email', async() => {
            await loginAs(page, '', VALID_USER.password);
        });

        await test.step('Expect URL and ERROR text', async() => {
            await loginPage.expectInvalidLogin('No customer account found');
        });
    });
    
    test('N-04 | Login with Invalid Email and invalid password', async({page})=>{
        await test.step('Login with invalid email and invalid password', async() => {
            await loginAs(page, 'zaraant@yahoo.com', 'demo123');
        });

        await test.step('Expect URL and ERROR text',async() => {
            await loginPage.expectInvalidLogin('No customer account found');
        });
    });
    
    test('N-05 | Login with Valid Email and invalid password', async({page})=>{
        await test.step('Login with valid email and invalid password', async() => {
            await loginAs(page, VALID_USER.email, 'demo123');
        });

        await test.step('Expect URL and ERROR text', async() => {
            await loginPage.expectInvalidLogin('The credentials provided are incorrect');
        });
    });
    
    test('N-06 | Login with Invalid Email and valid password', async({page})=>{
        await test.step('Login with invalid email and valid password',async() => {
            await loginAs(page, 'zaraant@yahoo.com', VALID_USER.password);
        });

        await test.step('Expect URL and ERROR text', async() => {
            await loginPage.expectInvalidLogin('No customer account found');
        });
    });
    
    
    test('N-07 | Email without "@" - form is not sent', async({page})=>{
    
        await test.step('Enter email without "@"', async()=>{
            await loginAs(page,'zaraantonyanyahoo.com', VALID_USER.password);
        });
    
        await test.step('Expect on login /login', async()=>{
            await loginPage.expectInvalidEmail();
        });
    
    });
    
    
    test('N-08 | Email without domain - "user@"', async({page})=>{
        await test.step('Enter email without domain', async() => {
            await loginAs(page, 'zaraantonyan@', VALID_USER.password);
        });
        
        await test.step('Expect on login /login', async()=>{
            await loginPage.expectInvalidEmail();
        });
    });
    
    test('N-09 | Valid Credentials with spaces in password', async({page})=>{
    
        await test.step('Login', async()=>{
            await loginAs(page, VALID_USER.email, ` ${VALID_USER.password} `);
        });
    
        await test.step('Expect URL and ERROR Message', async()=>{
            await loginPage.expectInvalidLogin('The credentials provided are incorrect');
        });
    });
    
    test('N-010 | Valid Email with uppercase characters', async({page})=>{
    
        const emailInUpperCase = VALID_USER2.email.toUpperCase();
    
        await test.step('Login', async()=>{
            await loginAs(page, emailInUpperCase, VALID_USER2.password);
        });
    
        await test.step('Expect URL, email and logout links', async()=>{
            await loginPage.expectLoginIsSuccessful();
        });
    });
    
    
    test('N-011 | An unauthorized user cannot access the account directly.', async({page})=>{
        await page.goto(ACCOUNT_PAGE);
        await expect(page).toHaveURL(/login/);
    });
    
    
    test('N-012 | After logging out authorized users do not have access to customer page', async({page})=>{
        await test.step('Login With Valid Credentials', async()=>{
            await loginAs(page, VALID_USER.email, VALID_USER.password);
        });
    
        await test.step('Goto Account Page', async()=>{
            await page.goto(ACCOUNT_PAGE);
            await expect(page).toHaveURL(ACCOUNT_PAGE);
        });
    
        await test.step('Log Out', async()=>{
            await page.locator(SELECTORS.logoutLink).click();
        });
    
        await test.step('Try to go to account page', async()=>{
            await page.goto(ACCOUNT_PAGE);
            await expect(page, '').toHaveURL(/login/);
        });
    });
});