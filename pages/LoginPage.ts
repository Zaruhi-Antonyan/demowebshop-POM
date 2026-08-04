import { expect, Page, Locator } from "@playwright/test";


const BASE_URL = 'https://demowebshop.tricentis.com';
const LOGIN_URL = `${BASE_URL}/login`;


const SELECTORS = {                      
   
    validationError: '.validation-summary-errors',
    emailValidationError: '.field-validation-error'
};

const VALID_USER = {
    email: 'zaraantonyan@yahoo.com',
    password: 'demowebshop'
};


export class LoginPage{

    private page: Page;
    private locator_header: Locator;
    private locator_logoutLink: Locator;
    private locator_validationError: Locator;
    private locator_emailValidationError: Locator;


    constructor(page: Page){
        this.page = page;
        this.locator_header = page.locator('.header');
        this.locator_logoutLink = page.locator('.ico-logout');
        this.locator_validationError = page.locator('.validation-summary-errors',);
        this.locator_emailValidationError = page.locator('.field-validation-error');
    }

    async open(){
        await this.page.goto(LOGIN_URL);
    }

    async expectLoginIsSuccessful(){
        await expect(this.page).toHaveURL(BASE_URL);
        await expect( this.locator_header).toContainText(VALID_USER.email);
        await expect( this.locator_header).toContainText('Log out');
    }

    async expectLogout(){
        await expect (this.page).toHaveURL(BASE_URL);
        await expect(this.locator_logoutLink).toHaveCount(0);
    }

    async expectInvalidLogin(errorMessage: string){
        await expect (this.page, 'Incorrect URL').toHaveURL(LOGIN_URL);
        await expect (this.locator_validationError).toContainText(errorMessage);
    }

    async expectInvalidEmail(){
        await expect(this.page).toHaveURL(LOGIN_URL);
        await expect(this.locator_emailValidationError).toContainText('Please enter a valid email address.');
    }

}