import { expect, Page } from "@playwright/test";


const BASE_URL = 'https://demowebshop.tricentis.com';
const LOGIN_URL = `${BASE_URL}/login`;
const ACCOUNT_PAGE = `${BASE_URL}/customer/info`

const VALID_USER = {
    email: 'zaraantonyan@yahoo.com',
    password: 'demowebshop'
}


const VALID_USER2 = {
    email: 'ZARAANTONYAN@YAHOO.COM',
    password: 'demowebshop'
}

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


export class LoginPage{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async open(){
        await this.page.goto(LOGIN_URL);
    }


    async expectWeAreOnCorrectPage(url: string, heading: string){
        await expect(this.page).toHaveURL(`${BASE_URL}${url}`);
        await expect(this.page.locator(SELECTORS.heading)).toHaveText(heading);
    }

    async expectLoginIsSuccessful(){
        await expect(this.page).toHaveURL(BASE_URL);
        await expect( this.page.locator(SELECTORS.header)).toContainText('zaraantonyan@yahoo.com');
        await expect( this.page.locator(SELECTORS.header)).toContainText('Log out');
    }

    async expectLogout(){
        await expect (this.page).toHaveURL(BASE_URL);
        await expect(this.page.locator(SELECTORS.logoutLink)).toHaveCount(0);
    }

}