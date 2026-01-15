import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { InviteInstructorModal } from "../../components/organization/InviteInstructorModal";
import { EditInstructorModal } from "../../components/organization/EditInstructorModal";
import { DeleteInstructorModal } from "../../components/organization/DeleteInstructorModal";

interface Instructor {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "pending";
  instructorId?: {
    _id: string;
    name: string;
    email: string;
  };
}

interface Organization {
  _id: string;
  name: string;
  instructors: Instructor[];
}

export const OrganizationTeam = () => {
  const navigate = useNavigate();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleInviteInstructor = async (data: { name: string; email: string }) => {
    try {
      const organizationId = localStorage.getItem("organizationId");
      const token = localStorage.getItem("organizationToken");

      const response = await fetch(
        `http://localhost:5000/api/organization/${organizationId}/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...data, role: "instructor" }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add instructor");
      }

      // Refresh organization data to show new instructor
      await fetchOrganization();
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const handleEditInstructor = async (instructorId: string, data: { name: string; email: string }) => {
    try {
      const organizationId = localStorage.getItem("organizationId");
      const token = localStorage.getItem("organizationToken");

      console.log('Updating instructor:', instructorId, data);

      const response = await fetch(
        `http://localhost:5000/api/organization/${organizationId}/instructors/${instructorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log('Update response:', result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to update instructor");
      }

      await fetchOrganization();
    } catch (err: any) {
      console.error('Edit error:', err);
      throw new Error(err.message);
    }
  };

  const handleDeleteInstructor = async () => {
    if (!selectedInstructor) return;
    
    try {
      setDeleteLoading(true);
      const organizationId = localStorage.getItem("organizationId");
      const token = localStorage.getItem("organizationToken");

      // Use the instructorId reference, not the array item ID
      const instructorIdToDelete = selectedInstructor.instructorId?._id || selectedInstructor._id;
      console.log('Deleting instructor:', instructorIdToDelete);

      const response = await fetch(
        `http://localhost:5000/api/organization/${organizationId}/instructors/${instructorIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log('Delete response:', result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete instructor");
      }

      setIsDeleteModalOpen(false);
      setSelectedInstructor(null);
      await fetchOrganization();
    } catch (err: any) {
      console.error('Delete error:', err.message);
      setDeleteLoading(false);
    }
  };

  const getNameColor = (index: number) => {
    const colors = [
      "text-blue-600",
      "text-purple-600",
      "text-pink-600",
      "text-red-600",
      "text-yellow-600",
      "text-green-600",
      "text-indigo-600",
      "text-cyan-600",
    ];
    return colors[index % colors.length];
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
      <div className="py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Team Members</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage your organization's instructors and team members
          </p>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus size={20} />
          Invite Instructor
        </button>
      </div>

      {/* Content */}
      {organization.instructors.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 text-center bg-white rounded-lg shadow"
        >
          <Users className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No team members yet
          </h3>
          <p className="mb-6 text-gray-600">
            Start building your team by inviting instructors
          </p>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus size={20} />
            Invite First Instructor
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden bg-white rounded-lg shadow"
        >
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                  Email
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                  Role
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-left text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {organization.instructors.map((instructor, index) => (
                <tr key={instructor._id || index} className="hover:bg-gray-50">
                  <td className={`px-6 py-3 text-sm font-semibold ${getNameColor(index)}`}>
                    {instructor.instructorId?.name || instructor.name || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {instructor.instructorId?.email || instructor.email}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 capitalize">
                    {instructor.role}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        instructor.status === "active"
                          ? "bg-green-100 text-green-700"
                          : instructor.status === "invited"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {instructor.status === "active"
                        ? "Active"
                        : instructor.status === "invited"
                        ? "Pending"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedInstructor(instructor);
                          setIsEditModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors font-medium"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedInstructor(instructor);
                          setIsDeleteModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Invite Modal */}
      <InviteInstructorModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteInstructor}
      />

      {/* Edit Modal */}
      {selectedInstructor && (
        <EditInstructorModal
          isOpen={isEditModalOpen}
          instructorId={selectedInstructor.instructorId?._id || selectedInstructor._id}
          currentName={selectedInstructor.instructorId?.name || selectedInstructor.name || ""}
          currentEmail={selectedInstructor.instructorId?.email || selectedInstructor.email || ""}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedInstructor(null);
          }}
          onUpdate={handleEditInstructor}
        />
      )}

      {/* Delete Modal */}
      {selectedInstructor && (
        <DeleteInstructorModal
          isOpen={isDeleteModalOpen}
          instructorName={selectedInstructor.instructorId?.name || selectedInstructor.name || "Instructor"}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedInstructor(null);
          }}
          onConfirm={handleDeleteInstructor}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};
