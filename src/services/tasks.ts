import HTTP from "./http";

const apiEndpoint = "/tasks";

interface TaskData {
  name: string;
  description: string;
  endDate: string;
  members: string[];
}

export function getTasks() {
  return HTTP.getInstance().get(`${apiEndpoint}`);
}

export function getTask(id: string) {
  return HTTP.getInstance().get(`${apiEndpoint}/${id}`);
}

export function createTask(project: TaskData) {
  return HTTP.getInstance().post(`${apiEndpoint}`, project);
}

export function changeTaskStatus(id: string, complated: boolean) {
  return HTTP.getInstance().patch(`${apiEndpoint}/${id}`, { complated });
}

export function getAssignedTask(id: string) {
  return HTTP.getInstance().get(`${apiEndpoint}/assigned/${id}`);
}

export function deleteTask(id: string) {
  return HTTP.getInstance().delete(`${apiEndpoint}/${id}`);
}
