import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./routes/Dashboard";
import Team from "./routes/Team";
import Projects from "./routes/Projects";
import TeamMember from "./routes/TeamMember";
import TeamMemberNew from "./routes/TeamMemberNew";
import Login from "./routes/Login";
import Activies from "./routes/Activities";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./routes/Logout";
import NotFound from "./routes/NotFound";
import ProjectInfo from "./routes/ProjectInfo";
import ProjectNew from "./routes/ProjectNew";
import TaskNew from "./routes/TaskNew";

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute children={<App />} />}>
          <Route index element={<Dashboard />} />
          <Route path="team-members/:id" element={<TeamMember />} />
          <Route path="team-members/new" element={<TeamMemberNew />} />
          <Route path="team-members" element={<Team />} />
          <Route path="projects" element={<Projects />} />
          <Route
            path="projects/:id/activities/:activityId"
            element={<Activies />}
          />
          <Route path="projects/new" element={<ProjectNew />} />
          <Route path="projects/:id" element={<ProjectInfo />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="projects/:id/tasks/new" element={<TaskNew />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
