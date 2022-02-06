import { test as base } from '@playwright/test';

import {ProjectView} from "../pages/ProjectView.page";
import {Dashboard} from "../pages/Dashboard.page";

type TestWithPageObjects = {
    projectView: ProjectView,
    dashboard: Dashboard
};

export const test = base.extend<TestWithPageObjects>({
    projectView: async ({page}, use) => {
        await use(new ProjectView(page))
    },
    dashboard: async ({page}, use) => {
        await use(new Dashboard(page))
    }
});

export { expect } from '@playwright/test';