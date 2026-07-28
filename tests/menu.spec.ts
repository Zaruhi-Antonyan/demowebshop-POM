import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const BASE_URL = 'https://demowebshop.tricentis.com'

const SELECTORS = {
    topMenu: '.header-menu > .top-menu',
    subMenu: '.header-menu > .top-menu  .sublist.firstLevel',
    menuLink: '.header-menu > .top-menu > li > a'
}

test.describe('Menu Positive Scenarios', () => {
    
    let homePage: HomePage;

    test.beforeEach( async ({ page }) => {
        
        homePage = new HomePage(page);
        await homePage.open();
    });

    test('P-01 | Menu Visible', async({ page }) => {

        await expect(page.locator(SELECTORS.topMenu)).toBeVisible();
    });

    test('P-02 | Check Books', async({ page }) => {

        await test.step('Click on menu - Books', async() => {
            await homePage.clickOnTopMenuItem('Books');
        });

        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Books', '/books', 'Demo Web Shop. Books');
        });
    });


    test ('P-03 | Check Computers', async({ page }) => {

        await test.step('Click on menu - Computers', async() => {
            await homePage.clickOnTopMenuItem('Computers');
        });

        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Computers', '/computers', 'Demo Web Shop. Computers');
        });
    });


    test ('P-04 | Check Electronics', async({ page }) => {

        await test.step('Clicl on menu - Electronics', async() => {
            await homePage.clickOnTopMenuItem('Electronics');
        });

        await test.step('Expect heading, URL, Title',async() => {
            await homePage.expectWeAreOnCorrectPage('Electronics', '/electronics', 'Demo Web Shop. Electronics');
        });
    });


    test ('P-05 | Check Apparel & Shoes', async ({ page }) => {

        await test.step('Click on menu - Aparel & Shoes', async() => {
            await homePage.clickOnTopMenuItem('Apparel & Shoes');
        });

        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Apparel & Shoes', '/apparel-shoes', 'Demo Web Shop. Apparel & Shoes');
        });
    }); 


    test ('P-06 | Check Digital downloads', async ({ page }) => {

        await test.step('Click on menu - Digital downloads', async() => {
            await homePage.clickOnTopMenuItem('Digital downloads');
        });

        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Digital downloads', '/digital-downloads', 'Demo Web Shop. Digital downloads');
        }); 
    });


    test ('P-07 | Check Jewelry', async ({ page }) => {

        await test.step('Click on menu - Jewelry', async() => {
            await homePage.clickOnTopMenuItem('Jewelry');
        });
        
        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Jewelry', '/jewelry', 'Demo Web Shop. Jewelry');
        });
    });


    test ('P-08 | Check Gift Cards', async ({ page }) => {

        await test.step('Click on menu - Gift Cards', async() => {
            await homePage.clickOnTopMenuItem('Gift Cards');
        });

        await test.step('Expect header, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Gift Cards', '/gift-cards', 'Demo Web Shop. Gift Cards');
        });
    });


    // Dropdown Menus


    test('P-09 | Check Computers -> Desktops', async({page}) => {
        
        await test.step('Hover over the menu - Computers', async() => {
            await homePage.hoverOnTopMenuItem('Computers');
        });

        await test.step('Click on submenu - Desktops', async() => {
            await homePage.clickOnSubMenuItem(0, 'Desktop');
        });

        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Desktops', '/desktops', 'Demo Web Shop. Desktops');
        });
    });


    test('P-10 | Check Computers -> Notebooks', async({page}) => {

        await test.step('Hover over the menu - Computers', async() => {
            await homePage.hoverOnTopMenuItem('Computers');
        });

        await test.step('Click on submenu - Notebooks', async() => {
            await homePage.clickOnSubMenuItem(0, 'Notebooks');
        });
        
        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Notebooks', '/notebooks', 'Demo Web Shop. Notebooks');
        });
    });


    test('P-11 | Check Computers -> Acessories', async({page})=> {

        await test.step('Hover over the menu - Computers', async() => {
            await homePage.hoverOnTopMenuItem('Computers');
        });
        
        await test.step('Click on submenu - Accessories', async() => {
            await homePage.clickOnSubMenuItem(0, 'Accessories');
        });
        
        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Accessories', '/accessories', 'Demo Web Shop. Accessories');
        });
    });


    test('P-12 | Check Electronics -> Camera, Photo', async({page}) => {

        await test.step('Hover over the menu - Electronics', async() => {
            await homePage.hoverOnTopMenuItem('Electronics');
        });

        await test.step('Click on submenu - Camera, Photo', async() => {
            await homePage.clickOnSubMenuItem(1, 'Camera, photo');
        });

        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Camera, photo', '/camera-photo', 'Demo Web Shop. Camera, photo');
        });  
    });


    test('P-13 | Check Electronics -> Cell phones', async({page}) => {
        await test.step('Hover over the menu - Electronics', async() => {
            await homePage.hoverOnTopMenuItem('Electronics');
        });
        
        await test.step('Click on submenu - Cell phones', async() => {
            await homePage.clickOnSubMenuItem(1, 'Cell phones');
        });

        await test.step('Expect heading, URL, Title', async() => {
            await homePage.expectWeAreOnCorrectPage('Cell phones', '/cell-phones', 'Demo Web Shop. Cell phones');
        });
    });
});

test.describe('Menu Negative Scenarios', () => {

    let homePage: HomePage;

    test.beforeEach(async({page}) => {
        
        homePage = new HomePage(page);
        await homePage.open();
    });
    
    test('N-01, "Fake Category" exists on menu', async({page}) => {
        await homePage.clickAndExpectFakeCategory('Fake Category');
    });

    test('N-02, Menu Items should not be less than 7', async({page}) => {
        await homePage.expectMenuLiksCountLessOrEqual(7);
    });
});