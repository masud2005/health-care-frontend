"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LogoutSuccessToast = () => {
  const searchParams = useSearchParams();
  // console.log("searchParams", searchParams);
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get("loggedOut") === "true") {
      // Show the toast notification for successful logout
      toast.success("You have been logged out successfully.");

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("loggedOut");
      router.replace(newUrl.toString());
    }
  }, [searchParams, router]);

  return null;
};

export default LogoutSuccessToast;
