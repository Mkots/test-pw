import { test, expect } from "../fixtures/extended-test.fixture";
import { ApiClient, authorize, getClient } from "../helpers";

let projectId;
let apiClient: ApiClient;

test.beforeAll(async () => {
  apiClient = await getClient();
});
test.beforeEach(async ({ page }) => {
  const newProject = await apiClient.createProject("New project with key");
  expect(newProject.ok()).toBeTruthy();

  projectId = (await newProject.json()).project_id;

  const newKey = await apiClient.addKeyToProject(projectId);

  expect(newKey.ok()).toBeTruthy();

  await page.goto("/");
  await authorize(page);
  await page.waitForNavigation();
});

test.afterEach(async () => {
  await apiClient.deleteAllProjects();
});

test("Add translation for plain key", async ({ page, projectView }) => {
  const original = "Cat";
  const translation = "Кот";

  await projectView.navigate(projectId);

  await projectView.setOriginal(original);
  await page.waitForTimeout(1500); // wait till data will be written
  await projectView.setTranslation(translation);

  await page.reload({ waitUntil: "load" });

  expect(await projectView.translationFieldBtn.first().textContent()).toBe(
    original
  );
  expect(await projectView.translationFieldBtn.last().textContent()).toBe(
    translation
  );
});
