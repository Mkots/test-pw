import {Locator, Page} from "@playwright/test";

export class Dashboard {
    readonly page: Page;
    readonly addProjectBtn: Locator;
    readonly projectNameField: Locator;
    readonly baseLanguageControl: Locator;
    readonly targetLanguageControl: Locator;
    readonly submitBtn: Locator;
    readonly projectContainer: Locator;

    private static addProjectBtnSelector = '[data-action="add-project"]';
    private static projectNameFieldSelector = '[name="name"]';
    private static select2Selector = '[class^="Select__control"]';
    private static submitBtnSelector = '[type="submit"]';
    private static projectContainerSelector = '[data-name="project-container"]'

    constructor(page: Page) {
        this.page = page;
        this.addProjectBtn = page.locator(Dashboard.addProjectBtnSelector)
        this.projectNameField = page.locator(Dashboard.projectNameFieldSelector)
        this.baseLanguageControl = page.locator(Dashboard.select2Selector, {hasText: 'English'});
        this.targetLanguageControl = page.locator(Dashboard.select2Selector, {hasText: 'Select...'});
        this.submitBtn = page.locator(Dashboard.submitBtnSelector);

        this.projectContainer = page.locator(Dashboard.projectContainerSelector);
    }

    async navigate(){
        await this.page.goto('/projects')
    }

    async createNewProject(projectName?: string){
        await this.page.waitForSelector(Dashboard.addProjectBtnSelector);
        await this.addProjectBtn.click();
        await this.page.waitForSelector(Dashboard.projectNameFieldSelector);

        await this.setProjectName(projectName);
        await this.setBaseLanguage();
        await this.setTargetLanguage();

        await this.submitBtn.first().click();
    }

    private async setProjectName(projectName?: string){
        await this.projectNameField.fill(projectName || "Project name");
    }

    private async setBaseLanguage(baseLanguage?: string, languageCode?: string){
        await this.baseLanguageControl.click();
        await this.baseLanguageControl.fill( baseLanguage || 'Russian');
        await this.page.click(`text='${baseLanguage || 'Russian'} (${languageCode || 'ru'})'`);
    }

    private async setTargetLanguage(targetLanguage?: string, languageCode?: string){
        await this.targetLanguageControl.click();
        await this.targetLanguageControl.fill(targetLanguage || 'English');
        await this.page.click(`text='${targetLanguage || 'English'} (${languageCode || 'en'})'`);
    }
}