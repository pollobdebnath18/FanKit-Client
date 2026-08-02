import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCheck, FaSpinner, FaSignOutAlt, FaLock } from "react-icons/fa";
import { ProfileAPI } from "../../api/profile.api";
import { authClient } from "../../lib/auth-client";
import type { User } from "../../api/user.api";

const inputClasses =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

interface SettingsPanelProps {
  user: User;
}

const SettingsPanel = ({ user }: SettingsPanelProps) => {
  const queryClient = useQueryClient();

  // Profile form
  const [name, setName] = useState(user.name ?? "");
  const [phone, setPhone] = useState(user.phone ?? "");
  const [profileMsg, setProfileMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const profileMutation = useMutation({
    mutationFn: () => ProfileAPI.update({ name, phone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      setProfileMsg({ type: "success", text: "Profile updated successfully." });
    },
    onError: (err: Error) => {
      setProfileMsg({ type: "error", text: err.message || "Update failed." });
    },
  });

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const passwordMutation = useMutation({
    mutationFn: () => ProfileAPI.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      setPasswordMsg({
        type: "success",
        text: "Password changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (err: Error) => {
      setPasswordMsg({ type: "error", text: err.message || "Change failed." });
    },
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    profileMutation.mutate();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    if (newPassword.length < 8) {
      setPasswordMsg({
        type: "error",
        text: "New password must be at least 8 characters.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    passwordMutation.mutate();
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Profile info */}
      <form
        onSubmit={handleProfileSubmit}
        className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900">Profile Information</h3>
        <p className="mt-1 text-sm text-slate-500">
          Update your name and contact details.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Email
            </label>
            <input
              value={user.email}
              disabled
              className={`${inputClasses} cursor-not-allowed bg-slate-100 text-slate-500`}
            />
            <p className="mt-1 text-xs text-slate-400">
              Email can&apos;t be changed here for security reasons.
            </p>
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
              className={inputClasses}
            />
          </div>
        </div>

        {profileMsg && (
          <p
            className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold ${
              profileMsg.type === "success"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {profileMsg.text}
          </p>
        )}

        <button
          type="submit"
          disabled={profileMutation.isPending}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#132C52] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {profileMutation.isPending ? (
            <FaSpinner className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FaCheck className="h-3.5 w-3.5" />
          )}
          Save Changes
        </button>
      </form>

      <div className="space-y-6">
        {/* Change password */}
        <form
          onSubmit={handlePasswordSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
        >
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <FaLock className="h-4 w-4 text-[#F5A623]" /> Change Password
          </h3>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={inputClasses}
              />
            </div>
          </div>

          {passwordMsg && (
            <p
              className={`mt-4 rounded-lg px-3 py-2 text-sm font-semibold ${
                passwordMsg.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {passwordMsg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={passwordMutation.isPending}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#132C52] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {passwordMutation.isPending ? (
              <FaSpinner className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <FaCheck className="h-3.5 w-3.5" />
            )}
            Update Password
          </button>
        </form>

        {/* Sign out */}
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
          <h3 className="text-lg font-bold text-slate-900">Account</h3>
          <p className="mt-1 text-sm text-slate-500">
            Sign out of your account on this device.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-6 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
          >
            <FaSignOutAlt className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
