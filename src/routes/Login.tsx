import { EyeIcon, EyeOffIcon, LockClosedIcon } from "@heroicons/react/solid";
import { AxiosError } from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, setJwt } from "../services/auth";
import HTTP from "../services/http";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    try {
      const res = await login(email, password);
      const { data: token } = res;
      setJwt(token);
      navigate("/");
    } catch (err) {
      const er = err as AxiosError;
      setError(er.response?.data);
    }
  };

  return (
    <>
      <div className="flex  h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Sign in
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => handleChange(e)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />

                  <button
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                    type="button"
                    className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md border border-gray-300 bg-slate-100 p-1 hover:bg-slate-200"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 rounded-lg border border-red-600 bg-red-50 p-3 text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
