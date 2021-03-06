import { test, expect } from "../fixtures/extended-test.fixture";
import { ApiClient, authorize, getClient } from "../helpers";

let apiClient: ApiClient;

test.beforeAll(async () => {
  apiClient = await getClient();
});

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await authorize(page);
  await page.waitForNavigation();
});

test.afterEach(async () => {
  await apiClient.deleteAllProjects();
});

test("Create test project", async ({
  page,
  request,
  dashboard,
  projectView,
}) => {
  const projectName = "Test project";

  await dashboard.navigate();
  await dashboard.createNewProject(projectName);

  await page.waitForNavigation();
  expect(page.url()).toMatch(
    /^https:\/\/stage\.lokalise\.com\/project\/[a-z0-9.]+\/\?view=multi$/
  );
  expect(await projectView.getCurrentProjectName()).toBe(projectName);

  await dashboard.navigate();

  expect(await dashboard.projectContainer.count()).toBe(1);

  const projectsCount = (await (await request.get("/api2/projects")).json())
    .projects.length;

  expect(projectsCount).toBe(1);
});
