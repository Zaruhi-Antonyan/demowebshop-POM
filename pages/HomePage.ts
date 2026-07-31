import { Page, expect } from '@playwright/test';


const BASE_URL = "https://demowebshop.tricentis.com";

const SELECTORS = {
    topMenu: '.header-menu > .top-menu',
    subMenu: '.header-menu > .top-menu .sublist.firstLevel',
    menuLinks:'.header-menu > .top-menu > li  > a',
};



export class HomePage{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async open(){
        await this.page.goto(BASE_URL);
    }

    async isMenuVisible(){
        await expect( this.page.locator(SELECTORS.topMenu)).toBeVisible();
    }

    async clickOnTopMenuItem(topMenuItem: string){
         await this.page.locator(SELECTORS.topMenu).getByRole('link', {name: topMenuItem}).click();
    }

    async expectWeAreOnCorrectPage(heading: string, url: string, title: string){
        await expect( this.page.getByRole('heading', {name: heading, exact: true})).toBeVisible();
        await expect( this.page ).toHaveURL(`${BASE_URL}${url}`);
        await expect( this.page ).toHaveTitle(title);
    } 

    async hoverOnTopMenuItem(topMenuItem: string){
         await this.page.locator(SELECTORS.topMenu).getByRole('link', {name: topMenuItem}).hover();
    }

    async clickOnSubMenuItem(subMenuIndex: number, subMenuItem: string){
        const submenu = this.page.locator(SELECTORS.subMenu).nth(subMenuIndex);
        await submenu.getByRole('link', {name: subMenuItem}).click();
    }

    async clickAndExpectFakeCategory(fakeCategoryItem: string){
        const fakeItem = this.page.locator(SELECTORS.topMenu).getByRole('link',{name: fakeCategoryItem});
        await expect(fakeItem,'Fake Category should not exist').toHaveCount(0);
    }


    async expectMenuLiksCountLessOrEqual(menuItemCount: number){
            const menuLinks = this.page.locator(SELECTORS.menuLinks);
            const actualCount = await menuLinks.count();
            expect(actualCount, "Menu items must be less or equal").toBeLessThanOrEqual(menuItemCount);
    }

}



