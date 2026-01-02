import { Outlet, Link } from "react-router-dom";

export function AdminShell() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4">
        <Link to="/admin">Dashboard</Link><br/>
        <Link to="/admin/courses">Courses</Link><br/>
        <Link to="/admin/schedule">Schedule</Link><br/>
        <Link to="/admin/analytics">Analytics</Link>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
