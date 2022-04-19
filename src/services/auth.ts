import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import HTTP from "./http";

const apiEndpoint = "/auth";

export function login(email: string, password: string) {
  return HTTP.getInstance().post(apiEndpoint, { email, password });
}

export function logout(): void {
  localStorage.removeItem("token");
}

interface DecodedToken {
  _id: string;
  admin: boolean;
  avatar: string;
  iat: number;
}

export function useDecodedToken(): DecodedToken {
  const token = getJwt();
  return jwtDecode(token!) as DecodedToken;
}

export function getJwt(): string | null {
  return localStorage.getItem("token");
}

export function setJwt(token: string): void {
  if (token) {
    localStorage.setItem("token", token);
    HTTP.setJwt();
  }
}

export default {
  login,
  logout,
  getJwt,
  setJwt,
};
