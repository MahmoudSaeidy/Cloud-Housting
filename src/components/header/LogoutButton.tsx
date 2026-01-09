// components/LogoutButton.tsx
"use client";

import { LogoutHandler } from "@/src/utils/LogoutHandler";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
   await LogoutHandler();
    router.push("/")
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 font-bold rounded-2xl cursor-pointer hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;