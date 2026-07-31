import { Page } from "@playwright/test"; 
 


const SELECTORS = {
    emailInput : '#Email',
    passwordInput : '#Password',
    loginButton: 'input.login-button',
    logoutLink : '.ico-logout',
};

 
 export async function loginAs (page: Page, email: string, password: string){
    await page.locator(SELECTORS.emailInput).fill(email);
    await page.locator(SELECTORS.passwordInput).fill(password)
    await page.locator(SELECTORS.loginButton).click();
};

export async function logout(page: Page){
    await page.locator(SELECTORS.logoutLink).click();
}
