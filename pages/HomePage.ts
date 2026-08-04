import { Page, expect, Locator } from '@playwright/test';


const BASE_URL = "https://demowebshop.tricentis.com";

export class HomePage{

    private page: Page;
    private locator_topMenu: Locator;
    private locator_subMenu: Locator;
    private locator_menuLinks: Locator;

    constructor(page: Page){
        this.page = page;
        this.locator_topMenu = page.locator('.header-menu > .top-menu');
        this.locator_subMenu = page.locator('.header-menu > .top-menu .sublist.firstLevel');
        this.locator_menuLinks = page.locator('.header-menu > .top-menu > li  > a');
    }

    async open(){
        await this.page.goto(BASE_URL);
    }

    async isMenuVisible(){
        await expect( this.locator_topMenu).toBeVisible();
    }

    async clickOnTopMenuItem(topMenuItem: string){
         await this.locator_topMenu.getByRole('link', {name: topMenuItem}).click();
    }

    async hoverOnTopMenuItem(topMenuItem: string){
         await this.locator_topMenu.getByRole('link', {name: topMenuItem}).hover();
    }

    async clickOnSubMenuItem(subMenuIndex: number, subMenuItem: string){
        const submenu = this.locator_subMenu.nth(subMenuIndex);
        await submenu.getByRole('link', {name: subMenuItem}).click();
    }

    async clickAndExpectFakeCategory(fakeCategoryItem: string){
        const fakeItem = this.locator_topMenu.getByRole('link',{name: fakeCategoryItem});
        await expect(fakeItem,'Fake Category should not exist').toHaveCount(0);
    }

    async expectMenuLiksCountLessOrEqual(menuItemCount: number){
        const menuLinks = this.locator_menuLinks;
        const actualCount = await menuLinks.count();
        expect(actualCount, "Menu items must be less or equal").toBeLessThanOrEqual(menuItemCount);
    }

}



