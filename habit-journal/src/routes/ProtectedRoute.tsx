import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";

export const ProtectedRoute = () => {
  const [validToken, setValidToken] = useState<Boolean | null>(null);

  useEffect(() => {
    auth().catch(() => {
      setValidToken(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
  }, []);

  const refresh = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    await apiClient
      .post("/auth/jwt/refresh/", {
        refresh: refreshToken,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access);
        setValidToken(true);
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setValidToken(false);
      });
  };

  const auth = async () => {
    const access = localStorage.getItem("accessToken");

    if (!access) {
      console.log("there is no token her ebudyy");
      setValidToken(false);
      return;
    }

    const decoded = jwtDecode(access);
    const expiration = decoded.exp;
    console.log(expiration);

    const now = Date.now() / 1000;
    if (expiration) {
      if (expiration < now) {
        console.log("Refreshing");
        await refresh();
      } else {
        setValidToken(true);
      }
    }
  };

  // Check if the user is authenticated
  if (validToken === null) {
    return <div>Loading...</div>;
  }

  if (validToken === false) {
    // If not authenticated, redirect to the login page
    console.log("token not found");
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
