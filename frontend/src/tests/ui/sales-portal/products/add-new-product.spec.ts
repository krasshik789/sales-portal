import test, { expect } from "@playwright/test";
import { credentials } from "../../../../config/env";
import { NOTIFICATIONS } from "../../../../data/salesPortal/notifications";
import { generateProductData } from "../../../../data/salesPortal/products/generateProductData";
// import { MANUFACTURERS } from "../data/salesPortal/products/manufacturers";
// import { IProduct } from "../data/types/product.types";
import { HomePage } from "../../../../ui/pages/home.page";
import { AddNewProductPage } from "../../../../ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "../../../../ui/pages/products/productsList.page";
import { SignInPage } from "../../../../ui/pages/signIn.page";


test.describe("[Sales Portal] [Products]", async () => {
  test.skip("Add new product OLD", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await homePage.open();
    await expect(signInPage.emailInput).toBeVisible();
    await signInPage.login(credentials.username,credentials.password)

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");

    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    await addNewProductPage.waitForOpened();
    const productData = await generateProductData();
    await addNewProductPage.fillForm(productData);

    await addNewProductPage.clickSave();

 
    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });

  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await homePage.open();

    await expect(signInPage.emailInput).toBeVisible();
    await signInPage.login(credentials.username,credentials.password)
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData =  await generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });
});
