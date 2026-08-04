import {expect, Page} from '@playwright/test';


const BASE_URL = "https://demowebshop.tricentis.com";

export class BasePage{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async expectWeAreOnCorrectPage(heading: string, url: string, title: string){
        await expect( this.page.getByRole('heading', {name: heading, exact: true})).toBeVisible();
        await expect( this.page ).toHaveURL(`${BASE_URL}${url}`);
        await expect( this.page ).toHaveTitle(title);
    } 
}