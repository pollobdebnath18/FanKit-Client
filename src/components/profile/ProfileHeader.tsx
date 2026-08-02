import { FaCrown, FaUserEdit, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

interface ProfileHeaderProps {
  name: string;
  email: string;
  role: "user" | "admin";
  memberSince: string;
  imageUrl?: string;
  onEdit: () => void;
}

const ProfileHeader = ({
  name,
  email,
  role,
  memberSince,
  imageUrl,
  onEdit,
}: ProfileHeaderProps) => {
  const avatar =
    imageUrl ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06111f] via-[#0B1F3A] to-[#123a7a] p-6 text-white md:p-8">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#F5A623]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src={avatar}
          alt={name}
          referrerPolicy="no-referrer"
          className="h-20 w-20 shrink-0 rounded-2xl border-2 border-white/20 object-cover shadow-lg"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-2xl font-black md:text-3xl">{name}</h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                role === "admin"
                  ? "bg-[#F5A623] text-[#0B1F3A]"
                  : "bg-white/10 text-blue-200"
              }`}
            >
              {role === "admin" && <FaCrown className="h-3 w-3" />}
              {role === "admin" ? "Admin" : "Member"}
            </span>
          </div>

          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-blue-200">
            <FaEnvelope className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{email}</span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-blue-200/70">
            <FaCalendarAlt className="h-3 w-3 shrink-0" />
            Member since {memberSince}
          </p>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#e09518] px-5 py-2.5 text-sm font-bold text-[#0B1F3A] shadow-lg shadow-[#F5A623]/30 transition hover:from-[#e09518] hover:to-[#c87d10]"
        >
          <FaUserEdit /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
