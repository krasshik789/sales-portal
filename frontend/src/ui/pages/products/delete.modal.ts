import { Locator } from "@playwright/test";
import { SalesPortalPage } from "../salesPortal.page";


export  class DeleteModalProduct extends SalesPortalPage {
    readonly uniqueElement = this.page.locator("div[name='confirmation-modal']");
    readonly title = this.uniqueElement.locator("h5");
    readonly modalBodyText = this.uniqueElement.locator(".modal-body > p");
    readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
    readonly deleteButton = this.uniqueElement.locator("button.btn-danger");
    readonly closeButton = this.uniqueElement.locator ("button.btn-close");

    async clickClose(){
        await this.closeButton.click();
    }
    
    async clickCancel(){
        await this.cancelButton.click();
    }

    async clickDelete(){
        await this.deleteButton.click();
    }
}