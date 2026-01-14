import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowRight,
  UserPlus,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

interface InvitedMember {
  email: string;
  role: "admin" | "instructor";
}

export const InviteInstructor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([]);

  const [formData, setFormData] = useState({
    email: "",
    role: "instructor" as "admin" | "instructor",
  });

  useEffect(() => {
    // Get organization ID from localStorage
    const orgId = localStorage.getItem("organizationId");
    if (!orgId) {
      navigate("/organization/dashboard");
    } else {
      setOrganizationId(orgId);
    }
  }, [navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check if email already added
    if (invitedMembers.some((m) => m.email === formData.email)) {
      setError("This email is already in the invite list");
      return;
    }

    setInvitedMembers([
      ...invitedMembers,
      {
        email: formData.email,
        role: formData.role,
      },
    ]);

    setFormData({ email: "", role: "instructor" });
    setSuccessMessage("Instructor added to invite list");

    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const handleRemoveMember = (index: number) => {
    setInvitedMembers(invitedMembers.filter((_, i) => i !== index));
  };

  const handleSubmitInvites = async () => {
    if (invitedMembers.length === 0) {
      setError("Add at least one instructor before sending invites");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("organizationToken");
      
      for (const member of invitedMembers) {
        const response = await fetch(
          `http://localhost:5000/api/organization/${organizationId}/invite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              email: member.email,
              role: member.role,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to invite instructor");
        }
      }

      setSuccessMessage(
        `Successfully sent ${invitedMembers.length} invitation(s)`
      );
      setInvitedMembers([]);

      setTimeout(() => {
        navigate("/organization/dashboard");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to send invites");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <button
            onClick={() => navigate("/organization/dashboard")}
            className="text-emerald-600 hover:text-emerald-700 font-medium mb-4 flex items-center gap-1"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Invite Instructors
          </h1>
          <p className="text-gray-600">
            Add instructors to your organization to collaborate on courses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
                  <p className="text-red-800">{error}</p>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-start gap-3"
                >
                  <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={20} />
                  <p className="text-green-800">{successMessage}</p>
                </motion.div>
              )}

              <form onSubmit={handleAddMember} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Instructor Email Address *
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="instructor@example.com"
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    The instructor must have an existing account to accept the invitation
                  </p>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block mb-3 text-sm font-semibold text-gray-700">
                    Role *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setFormData({ ...formData, role: "instructor" })}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="instructor"
                        checked={formData.role === "instructor"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value as "instructor",
                          })
                        }
                        className="w-4 h-4 text-emerald-600"
                      />
                      <div className="ml-3 flex-1">
                        <p className="font-semibold text-gray-900">Instructor</p>
                        <p className="text-sm text-gray-600">
                          Can create and manage courses
                        </p>
                      </div>
                      <UserPlus className="text-emerald-600" size={20} />
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setFormData({ ...formData, role: "admin" })}
                    >
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={formData.role === "admin"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            role: e.target.value as "admin",
                          })
                        }
                        className="w-4 h-4 text-emerald-600"
                      />
                      <div className="ml-3 flex-1">
                        <p className="font-semibold text-gray-900">Admin</p>
                        <p className="text-sm text-gray-600">
                          Can manage team and courses
                        </p>
                      </div>
                      <Shield className="text-emerald-600" size={20} />
                    </label>
                  </div>
                </div>

                {/* Add Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <UserPlus size={20} />
                  Add to Invite List
                </button>
              </form>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> You can add multiple instructors before sending invitations. They will receive an email to accept or reject the invitation.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Invite List ({invitedMembers.length})
              </h3>

              {invitedMembers.length === 0 ? (
                <div className="text-center py-8">
                  <UserPlus className="text-gray-300 mx-auto mb-3" size={32} />
                  <p className="text-gray-500 text-sm">
                    No instructors added yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {invitedMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 break-all">
                            {member.email}
                          </p>
                          <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded mt-2 capitalize">
                            {member.role}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(index)}
                          className="text-red-600 hover:text-red-700 font-bold text-lg ml-2"
                        >
                          ×
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <button
                onClick={handleSubmitInvites}
                disabled={loading || invitedMembers.length === 0}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Invites
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
