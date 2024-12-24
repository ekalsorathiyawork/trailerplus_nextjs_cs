// components/ProtectedRoute.js
"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { globalState } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!globalState.isAuthenticated) {
      // router.push("/"); // Redirect to HomePage if not authenticated
      console.log("authenticated")
    }
  }, [globalState.isAuthenticated, router]);

  if (!globalState.isAuthenticated) {
    return null; // Prevent rendering until redirect
  }

  return <>{children}</>;
}
