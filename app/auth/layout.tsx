"use client";
import React from "react";
import { useAuthContext } from "@/components/AuthProvider/AuthProvider";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/admin/home";
    }
  }, [isAuthenticated]);
  return <>{children}</>;
}
