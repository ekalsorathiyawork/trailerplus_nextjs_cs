import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Welcome to the Dashboard page!</div>
    </ProtectedRoute>
  );
}
