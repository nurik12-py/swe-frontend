import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import SelectMenu, { Person } from "../components/SelectMenu";
import User from "../models/User";
import { createProject } from "../services/projects";
import { getUsers } from "../services/user";

interface ProjectData {
  name: string;
  description: string;
  endDate: string;
  members: string[];
}

export default function ProjectNew() {
  const [people, setPeople] = useState<Person[]>([]);
  const [project, setProject] = useState<ProjectData>({
    name: "",
    description: "",
    endDate: "",
    members: [],
  });
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const getUsersAsync = async () => {
      const res = await getUsers();
      const users = res.data as User[];
      const people = users.map((user) => {
        return {
          id: user._id!,
          name: user.firstName + " " + user.lastName,
          selected: false,
          avatar: user.avatar,
        };
      });
      setPeople(people);
    };

    getUsersAsync();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProject((project) => {
      const name = e.target.name;
      const value = e.target.value;
      return { ...project, [name]: value };
    });
  };

  const handleSelectChange = (person: Person) => {
    setPeople((people) =>
      people.map((curr) => {
        if (person.id == curr.id) {
          curr.selected = !curr.selected;
        }
        return curr;
      })
    );
    setProject((project) => {
      project.members = people
        .filter((person) => person.selected)
        .map((person) => person.id);
      return { ...project };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await createProject(project);
      window.location.href = "/projects";
      setSaving(false);
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
                Create a project
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Manage tasks, activies and team members
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

                    <div className="col-span-6">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={project.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={project.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        End date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={project.endDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <SelectMenu people={people} onChange={handleSelectChange} />
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
