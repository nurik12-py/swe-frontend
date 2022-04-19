import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDecodedToken } from "./services/auth";

const App: React.FC = () => {
  const { _id, avatar } = useDecodedToken();

  return (
    <div>
      <Navbar userId={_id} avatar={avatar} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-14">
          <div className="py-2 md:py-6 px-4 md:px-4">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
