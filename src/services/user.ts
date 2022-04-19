import User from "../models/User";
import HTTP from "./http";

const apiEndpoint = "/users";

export function getCurrentUser() {
  return HTTP.getInstance().get(`${apiEndpoint}/me`);
}

export function getUser(id: string) {
  return HTTP.getInstance().get(`${apiEndpoint}/${id}`);
}

export function getUsers() {
  return HTTP.getInstance().get(`${apiEndpoint}`);
}

export function deleteUser(id: string) {
  return HTTP.getInstance().delete(`${apiEndpoint}/${id}`);
}

export function patchUser(id: string, data: User) {
  return HTTP.getInstance().patch(`${apiEndpoint}/${id}`, data);
}

export function createUser(data: User) {
  return HTTP.getInstance().post(`${apiEndpoint}`, data);
}
