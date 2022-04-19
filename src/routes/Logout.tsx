import { FC, useEffect } from "react";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Logout: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  });

  return <p>Logout</p>;
};

export default Logout;
