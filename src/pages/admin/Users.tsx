import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaEnvelope,
  FaSearch,
  FaShieldAlt,
  FaTrash,
  FaUserTag,
} from "react-icons/fa";
import { UserAPI, type User, type UserRole } from "../../api/user.api";
import { useUsers } from "../../hooks/useUsers";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useToast } from "../../lib/toast-context";
import { formatDate } from "../../lib/format";
import { userRoleTone } from "../../lib/statusTones";
import PageHeader from "../../components/admin/ui/PageHeader";
import SectionCard from "../../components/admin/ui/SectionCard";
import StatusBadge from "../../components/admin/ui/StatusBadge";
import SkeletonTable from "../../components/admin/ui/SkeletonTable";
import EmptyState from "../../components/admin/ui/EmptyState";
import ErrorState from "../../components/admin/ui/ErrorState";
import DeleteModal from "../../components/admin/DeleteModal";

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Users = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isPending, isError, refetch } = useUsers();
  const { currentUser } = useCurrentUser();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["users"] });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      UserAPI.updateRole(id, role),
    onSuccess: () => {
      toast.success("User role updated");
      invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => UserAPI.deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted");
      invalidate();
    },
    onError: (error: Error) => toast.error(error.message),
    onSettled: () => setDeleteTarget(null),
  });

  const toggleRole = (user: User) => {
    if (!user._id || roleMutation.isPending) return;
    roleMutation.mutate({
      id: user._id,
      role: user.role === "admin" ? "user" : "admin",
    });
  };

  const isSelf = (user: User) => user._id === currentUser?._id;

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <PageHeader
        title="Users"
        subtitle={`${users.length} registered user${users.length !== 1 ? "s" : ""} in your store`}
      />

      {/* Search */}
      <div className="relative max-w-sm">
        <FaSearch className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name or email..."
          aria-label="Search users"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <SectionCard bodyClassName="p-0 sm:p-0">
        {isPending ? (
          <div className="p-5">
            <SkeletonTable rows={7} columns={5} />
          </div>
        ) : isError ? (
          <ErrorState
            title="Couldn't load users"
            message="We ran into a problem fetching your users."
            onRetry={() => void refetch()}
          />
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            message={
              searchTerm
                ? `No users match "${searchTerm}".`
                : "There are no registered users yet."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th scope="col" className="px-6 py-4">User</th>
                  <th scope="col" className="px-6 py-4">Email Address</th>
                  <th scope="col" className="px-6 py-4">Joined</th>
                  <th scope="col" className="px-6 py-4">Role</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                          {initialsOf(user.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          {user.role === "admin" && (
                            <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-brand/5 px-2 py-0.5 text-[10px] font-bold uppercase text-brand">
                              <FaShieldAlt className="h-2 w-2" /> Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <FaEnvelope className="h-3 w-3 text-slate-400" />
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        label={user.role === "admin" ? "Admin" : "User"}
                        tone={userRoleTone(user.role)}
                        dot
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleRole(user)}
                          disabled={isSelf(user) || roleMutation.isPending}
                          title={isSelf(user) ? "You can't change your own role" : "Toggle role"}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FaUserTag />
                          {isSelf(user) ? "You" : user.role === "admin" ? "Make user" : "Make admin"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(user)}
                          disabled={isSelf(user) || deleteMutation.isPending}
                          title={isSelf(user) ? "You can't delete your own account" : "Delete user"}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <FaTrash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => !deleteMutation.isPending && setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget._id)}
        isDeleting={deleteMutation.isPending}
        title="Delete User Account?"
        description="This will permanently remove this user and all their related data from the database. This action cannot be undone."
        itemName={deleteTarget ? `${deleteTarget.name} (${deleteTarget.email})` : undefined}
      />
    </div>
  );
};

export default Users;