import { FC } from "react";
import { Project } from "../models/Project";

const dateToMillis = (date: Date) => {
  return new Date(date).getTime();
};

const getWidth = (
  start: Date,
  end: Date,
  mainStart: Date,
  mainEnd: Date
): string => {
  return (
    ((dateToMillis(end) - dateToMillis(start)) * 100) /
      (dateToMillis(mainEnd) - dateToMillis(mainStart)) +
    "%"
  );
};

const getDate = (stringDate: Date): string => {
  const date = new Date(stringDate);
  return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
};

const getLeftPosition = (
  start: Date,
  mainStart: Date,
  mainEnd: Date
): string => {
  return (
    ((dateToMillis(start) - dateToMillis(mainStart)) * 100) /
      (dateToMillis(mainEnd) - dateToMillis(mainStart)) +
    "%"
  );
};

interface TimelineProps {
  project: Project;
}

export const Timeline: FC<TimelineProps> = ({ project }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div>{getDate(project.startDate)}</div>
        <div>{getDate(project.endDate)}</div>
      </div>
      <div className="h-3 w-full rounded-full bg-slate-300"></div>
      <div className="relative m-2 w-full">
        {project.tasks.map((task, index) => (
          <div
            style={{
              width: getWidth(
                task.startDate,
                task.endDate,
                project.startDate,
                project.endDate
              ),
              left: getLeftPosition(
                task.startDate,
                project.startDate,
                project.endDate
              ),
              top: index * 20 + "px",
            }}
            className={`absolute h-3 rounded-full ${
              task.complated ? "bg-green-300" : "bg-fuchsia-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
