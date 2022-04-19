import { AxiosError } from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../models/User";
import setAvatar from "../services/avatar";
import { createUser } from "../services/user";
import getBase64 from "../utils/getBase64";
import getCompressedImage from "../utils/getCompressedImage";
import crop from "../utils/getCroppedImage";

export default function TeamMember() {
  const avatarInput = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    avatar: "",
    role: "",
    admin: false,
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser((user) => {
      const name = e.target.name;
      const value = e.target.value;
      return { ...user, [name]: value };
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((user) => {
      const name = e.target.name;
      const checked = e.target.checked;
      return { ...user, [name]: checked };
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const imageFile =
        e.currentTarget.files && (e.currentTarget.files[0] as File);
      const base64 = (await getBase64(imageFile!)) as string;
      const cropedImage = (await crop(base64, 1)) as File;
      const compressedImage = (await getCompressedImage(cropedImage)) as File;
      const downloadURL = (await setAvatar(user.email, imageFile!)) as string;
      setUser((user) => {
        return { ...user, avatar: downloadURL };
      });
      setUploading(false);
    } catch (error) {
      setErrorMessage(error as string);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await createUser(user);
      setSaving(false);
      window.location.href = "/team-members";
    } catch (error) {
      setSaving(false);
      const err = error as AxiosError;
      setErrorMessage(err.response?.data);
    }
  };

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Profile data will be visiable to team members
              </p>
            </div>
          </div>
          <div className={`mt-5 md:col-span-2 md:mt-0`}>
            <form>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {errorMessage && (
                      <div className="col-span-6 rounded border border-red-600 bg-red-50 p-3">
                        <p className="text-red-600">{errorMessage}</p>
                      </div>
                    )}
                    <div className="col-span-6 ">
                      <label className="block text-sm font-medium text-gray-700">
                        Photo
                      </label>
                      <div className="mt-1 flex items-center">
                        <div className="mr-4 shrink-0">
                          <img
                            className={`h-16 w-16 rounded-full object-cover ${
                              uploading ? "animate-pulse" : ""
                            }`}
                            src={user.avatar}
                            alt=""
                          />
                        </div>
                        <label className="block">
                          <span className="sr-only">Choose profile photo</span>
                          <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/*"
                            ref={avatarInput}
                            onChange={handleAvatarChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleChange}
                        value={user.firstName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handleChange}
                        value={user.lastName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={user.email}
                        id="email"
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        id="password"
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        onChange={handleChange}
                        value={user.role}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="" selected>
                          Member
                        </option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="ceo">CEO</option>
                        <option value="tester">QA Tester</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <legend className="block text-sm font-medium text-gray-700">
                        Access
                      </legend>
                      <div className="mt-1 space-y-4">
                        <div className="flex items-start">
                          <div className="flex h-5 items-center">
                            <input
                              id="admin"
                              name="admin"
                              type="checkbox"
                              checked={user.admin}
                              onChange={handleCheckboxChange}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="admin"
                              className="font-medium text-gray-700"
                            >
                              Admin
                            </label>
                            <p className="text-gray-500">
                              Can create, modify, delete projects and team
                              members
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    onClick={handleSave}
                    type="submit"
                    disabled={saving}
                    className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm ${
                      saving ? "bg-indigo-300" : "bg-indigo-600"
                    } ${
                      saving ? "hover:bg-indigo-400" : "hover:bg-indigo-700"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  >
                    {saving ? "Creating..." : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
