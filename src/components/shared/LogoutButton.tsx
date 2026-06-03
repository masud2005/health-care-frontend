"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logoutUser";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the logout function to clear cookies
    await logoutUser();
  };

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
