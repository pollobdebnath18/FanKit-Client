import { Navigate } from "react-router";
import { authClient } from "../lib/auth-client";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { data: session, isPending } = authClient.useSession();

  const { currentUser, isLoading } = useCurrentUser();

  if (isPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  if (currentUser?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
