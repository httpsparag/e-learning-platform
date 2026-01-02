import { Outlet } from "react-router-dom";
import { FloatingNavbar } from "./FloatingNavbar.tsx";

export function AppShell() {
  return (
    <>
      <Outlet />
    </>
  );
}
