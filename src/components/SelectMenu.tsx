/* This example requires Tailwind CSS v2.0+ */
import { FC, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface Person {
  id: string;
  name: string;
  avatar: string;
  selected: boolean;
}

interface SelectMenuProps {
  people: Person[];
  onChange: (person: Person) => void;
}

const SelectMenu: FC<SelectMenuProps> = ({ people, onChange }): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((state) => !state);
  };

  return (
    <Listbox value={people[0]} onChange={onChange}>
      <div className="col-span-6">
        <Listbox.Label className="block text-sm font-medium text-gray-700">
          Assigned to
        </Listbox.Label>
        <div className="mt-1">
          <div onClick={handleOpen}>
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              {people.filter((person) => person.selected).length > 0 ? (
                <div className="flex -space-x-1 overflow-hidden">
                  {people.map(
                    (person) =>
                      person.selected && (
                        <img
                          key={person.id}
                          className="inline-block h-6 w-6 rounded-full border-2 border-gray-200 object-cover "
                          src={person.avatar}
                          alt=""
                        />
                      )
                  )}
                </div>
              ) : (
                <p>No one assingned</p>
              )}

              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>
          {open && (
            <Listbox.Options
              static={true}
              className="absolute  z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {people.map((person) => (
                <Listbox.Option
                  key={person.id}
                  className={({ active }) =>
                    classNames(
                      active ? "bg-indigo-600 text-white" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-3 pr-9"
                    )
                  }
                  value={person}
                >
                  <>
                    <div className="flex items-center">
                      <img
                        src={person.avatar}
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full object-cover ring-2  ring-neutral-200 "
                      />
                      <span
                        className={classNames(
                          person.selected ? "font-semibold" : "font-normal",
                          "ml-3 block truncate"
                        )}
                      >
                        {person.name}
                      </span>
                    </div>

                    {person.selected && (
                      <span
                        className={classNames(
                          "text-indigo-600",
                          "absolute inset-y-0 right-0 flex items-center px-4"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </div>
      </div>
    </Listbox>
  );
};

export default SelectMenu;
