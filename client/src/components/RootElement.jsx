import React from "react";
import { Outlet } from "react-router-dom";

export default function RootElement(props) {
  return (
    <div className="container mt-4">
      <Outlet />
    </div>
  );
}
