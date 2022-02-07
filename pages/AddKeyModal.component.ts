import { Locator, Page } from "@playwright/test";

type Platform = "iOS" | "Android" | "Web" | "Other";

export class AddKeyModal {
  readonly page: Page;
  readonly keyNameField: Locator;
  readonly platformsField: Locator;
  readonly tagsField: Locator;
  readonly submitBtn: Locator;

  private static keyNameSelector = "#keyName";
  private static platformsFieldSelector = "#adddevice_div input";
  private static tagsFieldSelector = "#s2id_key_editor_tags input";
  private static submitBtnSelector = "#btn_addkey";

  constructor(page) {
    this.page = page;
    this.keyNameField = page.locator(AddKeyModal.keyNameSelector);
    this.platformsField = page.locator(AddKeyModal.platformsFieldSelector);
    this.tagsField = page.locator(AddKeyModal.tagsFieldSelector);
    this.submitBtn = page.locator(AddKeyModal.submitBtnSelector);
  }

  async createNewKey(keyName?: string) {
    await this.addKeyName(keyName);
    await this.addPlatform();
    await this.addTags();

    await this.submit();
  }

  private async addKeyName(keyName?: string) {
    await this.keyNameField.fill(keyName || "Default key name");
  }

  private async addPlatform(platform?: Platform) {
    await this.platformsField.fill(platform || "Other");
    await this.page
      .locator(".select2-result-label", { hasText: `${platform || "Other"}` })
      .click();
  }

  private async addTags(tag?: string) {
    await this.tagsField.fill(tag || "Default tag");
    await this.page
      .locator(".select2-result-label", { hasText: `${tag || "Default tag"}` })
      .click();
  }

  private async submit() {
    await this.submitBtn.click();
  }
}
