import { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserTag,
  FaEnvelope,
  FaCalendarAlt,
  FaShieldAlt,
  FaTrash,
} from "react-icons/fa";
import DeleteModal from "../../components/admin/DeleteModal";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  emailVerified?: boolean;
  createdAt?: string;
}

const fallbackUsers: User[] = [
  { _id: "usr-1", name: "Sumit Saha", email: "sumit@fankit.com", role: "admin", createdAt: "2026-05-12T10:00:00.000Z" },
  { _id: "usr-2", name: "Rahat Chowdhury", email: "rahat@gmail.com", role: "user", createdAt: "2026-06-01T14:32:00.000Z" },
  { _id: "usr-3", name: "Sadia Islam", email: "sadia@outlook.com", role: "user", createdAt: "2026-06-18T08:15:00.000Z" },
  { _id: "usr-4", name: "Tanvir Ahmed", email: "tanvir@yahoo.com", role: "user", createdAt: "2026-07-05T19:44:00.000Z" },
];

const BASE_URL = (import.meta as any).env?.VITE_AUTH_API_URL || "http://localhost:8000";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/users`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setUsers(data.users?.length ? data.users : fallbackUsers);
    } catch {
      setUsers(fallbackUsers);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleToggleRole = async (email: string, currentRole: "user" | "admin") => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, role: newRole } : u)));
    try {
      await fetch(`${BASE_URL}/api/users/set-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/users/${deleteTarget._id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      }
    } catch (err) {
      console.error("Delete user failed:", err);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 p-6">
      {/* Title Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] md:text-3xl">Manage Users</h2>
          <p className="mt-1 text-slate-500">
            {users.length} registered user{users.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#0B1F3A] shadow-sm hover:bg-slate-50 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none shadow-sm focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <svg className="h-8 w-8 animate-spin text-[#0B1F3A]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-sm font-semibold text-slate-400">Loading users...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const initials = user.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    const dateStr = user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                      : "N/A";

                    return (
                      <tr key={user._id} className="transition hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-gradient-to-br from-[#0B1F3A]/10 to-[#F5A623]/10 text-xs font-bold text-[#0B1F3A]">
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{user.name}</p>
                              {user.role === "admin" && (
                                <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#F5A623]/10 px-2 py-0.5 text-[9px] font-bold uppercase text-[#F5A623]">
                                  <FaShieldAlt className="text-[8px]" /> Admin
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-slate-600">
                            <FaEnvelope className="text-xs text-slate-400" />
                            {user.email}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                            <FaCalendarAlt className="text-slate-400" />
                            {dateStr}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${user.role === "admin"
                                ? "bg-[#0B1F3A] text-white"
                                : "bg-slate-100 text-slate-700"
                              }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleToggleRole(user.email, user.role)}
                              title="Toggle role"
                              className="flex items-center gap-1.5 rounded-lg border border-[#F5A623] px-3 py-1.5 text-xs font-bold text-[#F5A623] transition hover:bg-[#F5A623]/10"
                            >
                              <FaUserTag /> Toggle Role
                            </button>
                            <button
                              onClick={() => setDeleteTarget(user)}
                              title="Delete user"
                              className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => !isDeleting && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="Delete User Account?"
        description="This will permanently remove this user from the database. This action cannot be undone."
        itemName={deleteTarget ? `${deleteTarget.name} (${deleteTarget.email})` : undefined}
      />
    </div>
  );
};

export default Users;