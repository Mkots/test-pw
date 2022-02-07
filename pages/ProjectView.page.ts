import { Locator, Page } from "@playwright/test";
import { AddKeyModal } from "./AddKeyModal.component";

export class ProjectView {
  readonly page: Page;
  readonly currentBreadcrumb: Locator;
  readonly createKeyBtn: Locator;
  readonly keyContainer: Locator;
  readonly currentKeyName: Locator;

  readonly translationFieldBtn: Locator; // TODO: find better names
  readonly translationField: Locator; // TODO: find better names
  readonly saveTranslationBtn: Locator;

  private static currentBreadcrumbSelector =
    '[aria-label="breadcrumb"]>[aria-current="page"]';
  private static createKeyBtnSelector = '[aria-label="Add first key"]';
  private static keyContainerSelector = ".row-key";
  private static currentKeyNameSelector = ".edit-key";

  private static translationFieldBtnSelector = ".cell-trans .highlight";
  private static translationFieldSelector = ".CodeMirror-line";
  private static saveTranslationBtnSelector = "button.save";

  constructor(page) {
    this.page = page;
    this.currentBreadcrumb = page.locator(
      ProjectView.currentBreadcrumbSelector
    );
    this.createKeyBtn = page.locator(ProjectView.createKeyBtnSelector);
    this.keyContainer = page.locator(ProjectView.keyContainerSelector);
    this.currentKeyName = page.locator(
      `${ProjectView.keyContainerSelector} ${ProjectView.currentKeyNameSelector}`
    );

    this.translationFieldBtn = page.locator(
      ProjectView.translationFieldBtnSelector
    );
    this.translationField = page.locator(ProjectView.translationFieldSelector);
    this.saveTranslationBtn = page.locator(
      ProjectView.saveTranslationBtnSelector
    );
  }

  async getCurrentProjectName() {
    await this.page.waitForSelector(ProjectView.currentBreadcrumbSelector);
    return await this.currentBreadcrumb.textContent();
  }

  public get AddKeyModal() {
    return new AddKeyModal(this.page);
  }

  async navigate(pageId) {
    await this.page.goto(`project/${pageId}/?view=multi`);
  }

  async getCurrentKeyName() {
    return await this.currentKeyName.innerText();
  }

  async setOriginal(originalText?: string) {
    await this.translationFieldBtn.first().click();
    await this.translationField
      .first()
      .type(originalText || "Original text", { delay: 50 });
    await this.saveTranslationBtn.first().click();
  }

  async setTranslation(translationText?: string) {
    await this.translationFieldBtn.last().click();
    await this.translationField
      .first()
      .type(translationText || "Текст перевода", { delay: 50 });
    await this.saveTranslationBtn.first().click();
  }
}
