import { test, expect } from "../fixtures/extended-test.fixture";
import { ApiClient, authorize, getClient } from "../helpers";

let apiClient: ApiClient;
let projectId: string;

test.beforeAll(async () => {
  apiClient = await getClient();
});

test.beforeEach(async ({ page }) => {
  const newProject = await apiClient.createProject("New project");
  expect(newProject.ok()).toBeTruthy();

  projectId = (await newProject.json()).project_id;

  await page.goto("/");
  await authorize(page);
  await page.waitForNavigation();
});

test.afterEach(async () => {
  await apiClient.deleteAllProjects();
});

test("Add first key", async ({ page, request, projectView }) => {
  const keyName = "Test key";

  await projectView.navigate(projectId);
  await projectView.createKeyBtn.click();
  await projectView.AddKeyModal.createNewKey(keyName);
  await projectView.AddKeyModal.keyNameField.waitFor({ state: "visible" });
  await page.waitForTimeout(3000); // wait till data will be written

  const keys: Array<unknown> = (
    await (await request.get(`/api2/projects/${projectId}/keys`)).json()
  ).keys;

  expect(await projectView.getCurrentKeyName()).toBe(keyName);
  expect(keys.length).toBe(1);
});
