import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell.tsx";
import { AdminShell } from "../components/admin/AdminShell.tsx";
import {
  Landing,
  Courses,
  CourseDetail,
  LiveClass,
  Dashboard,
  Payment,
  Profile,
} from "../pages/user";

import {
  AdminDashboard,
  CourseManagement,
  LiveScheduler,
  UserAnalytics,
} from "../pages/admin";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:id", element: <CourseDetail /> },
      { path: "/live/:id", element: <LiveClass /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/payment", element: <Payment /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminShell />,
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/courses", element: <CourseManagement /> },
      { path: "/admin/schedule", element: <LiveScheduler /> },
      { path: "/admin/analytics", element: <UserAnalytics /> },
    ],
  },
]);
