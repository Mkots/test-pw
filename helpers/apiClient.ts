import { APIResponse, request } from "@playwright/test";

export type ApiClient = {
  createProject: (name?: string) => Promise<APIResponse>;
  deleteAllProjects: () => Promise<void>;
};

export const getClient = async (): Promise<ApiClient> => {
  const context = await request.newContext({
    baseURL: "https://stage.lokalise.com",
    extraHTTPHeaders: {
      "x-api-token": process.env.API_TOKEN,
    },
  });
  return {
    createProject: async (name?: string) => {
      return await context.post("/api2/projects", {
        data: {
          name: name || "Test project",
          description: name || "Test project",
          languages: [
            {
              lang_iso: "en",
              custom_iso: "en-us",
            },
            {
              lang_iso: "en_GB",
              custom_iso: "en-gb",
            },
          ],
          base_lang_iso: "en-us",
        },
      });
    },
    deleteAllProjects: async () => {
      const allProjects = await context.get("/api2/projects");
      const projectsId: Array<string> = (await allProjects.json()).projects.map(
        (project) => project.project_id
      );
      for (const project of projectsId) {
        await context.delete(`/api2/projects/${project}`);
      }
    },
  };
};
