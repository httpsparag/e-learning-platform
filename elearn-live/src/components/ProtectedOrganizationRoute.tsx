import { Navigate } from "react-router-dom";

export const ProtectedOrganizationRoute = ({ children }: { children: React.ReactNode }) => {
  const organizationToken = localStorage.getItem("organizationToken");

  if (!organizationToken) {
    return <Navigate to="/auth/organization/login" replace />;
  }

  return children;
};
