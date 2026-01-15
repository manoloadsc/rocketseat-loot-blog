"use client";

import React from "react";
import { useAuthContext } from "@/components/AuthProvider/AuthProvider";

export default function Page() {
  const { user } = useAuthContext();

  return (
    <div>
      <div>
        <div>{user}</div>
      </div>
    </div>
  );
}
