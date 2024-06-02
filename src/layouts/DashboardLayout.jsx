import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, Outlet } from "react-router-dom";
import Loader from "../Components/common/Loader";
import { urls } from "../router";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate(urls.login);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
