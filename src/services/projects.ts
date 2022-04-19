import HTTP from "./http";

const apiEndpoint = "/projects";

interface ProjectData {
  name: string;
  description: string;
  endDate: string;
  members: string[];
}

export function getProjects() {
  return HTTP.getInstance().get(`${apiEndpoint}`);
}

export function getProject(id: string) {
  console.log(id);
  return HTTP.getInstance().get(`${apiEndpoint}/${id}`);
}

export function createProject(project: ProjectData) {
  return HTTP.getInstance().post(`${apiEndpoint}`, project);
}

export function deleteProject(id: string) {
  return HTTP.getInstance().delete(`${apiEndpoint}/${id}`);
}
