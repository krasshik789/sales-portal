import { SalesPortalPage } from "../salesPortal.page";
import { IProductInTable } from "../../../data/types/product.types";
import {MANUFACTURERS} from "../../../data/salesPortal/products/manufacturers" 
import { DeleteModalProduct } from "./delete.modal";
import { Page } from "@playwright/test";

export class ProductsListPage extends SalesPortalPage {
  constructor(page: Page) {
    super(page);
  }

  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly deleteModal = new DeleteModalProduct(this.page);

  readonly tableRowByName = (productName: string) =>
    this.page.locator(
      "table tbody tr",
      { has: this.page.locator("td", { hasText: productName }) }
    );

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  readonly deleteButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle("Delete");

  async clickDelete(productName: string) {
    await this.deleteButton(productName).click();
  }

  async getLastProduct(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] =
      await this.tableRowByName(productName).locator("td").allInnerTexts();

    return {
      name: name!,
      price: +price!.replace("$", ""),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    };
  }
}
