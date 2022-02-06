import {Locator, Page} from "@playwright/test";

export class ProjectView {
    readonly page: Page;
    readonly currentBreadcrumb: Locator;

    private static currentBreadcrumbSelector = '[aria-label="breadcrumb"]>[aria-current="page"]';

    constructor(page) {
        this.page = page;
        this.currentBreadcrumb = page.locator(ProjectView.currentBreadcrumbSelector);
    }

    async getCurrentProjectName(){
        await this.page.waitForSelector(ProjectView.currentBreadcrumbSelector);
        return await this.currentBreadcrumb.textContent();
    }

}