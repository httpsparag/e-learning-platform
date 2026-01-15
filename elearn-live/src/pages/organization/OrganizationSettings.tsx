import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Organization {
  email: string;
  plan: string;
  paymentStatus: string;
}

export const OrganizationSettings = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    try {
      const organizationId = localStorage.getItem("organizationId");
      const token = localStorage.getItem("organizationToken");

      if (!organizationId || !token) {
        navigate("/auth/organization/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/organization/${organizationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch organization");
      }

      setOrganization(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-b-2 rounded-full border-emerald-600 animate-spin"></div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl w-full"
    >
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="mb-6 text-lg font-bold text-gray-900">
          Organization Settings
        </h3>

        {/* Email Settings */}
        <div className="pb-6 mb-6 border-b border-gray-200">
          <label className="text-sm font-semibold text-gray-900">
            Organization Email
          </label>
          <input
            type="email"
            value={organization.email}
            disabled
            className="w-full px-4 py-2 mt-2 text-gray-600 border border-gray-200 rounded-lg bg-gray-50"
          />
        </div>

        {/* Plan Info */}
        <div className="pb-6 mb-6 border-b border-gray-200">
          <label className="text-sm font-semibold text-gray-900">
            Current Plan
          </label>
          <div className="p-4 mt-2 rounded-lg bg-blue-50">
            <p className="font-medium text-gray-900 capitalize">
              {organization.plan} Plan
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Status:{" "}
              <span className="font-semibold capitalize">
                {organization.paymentStatus}
              </span>
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h4 className="mb-4 text-sm font-semibold text-red-600">
            Danger Zone
          </h4>
          <button className="px-4 py-2 font-medium text-red-600 transition-colors border-2 border-red-200 rounded-lg hover:bg-red-50">
            Delete Organization
          </button>
        </div>
      </div>
    </motion.div>
  );
};
