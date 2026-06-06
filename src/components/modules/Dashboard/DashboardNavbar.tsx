import { getUserInfo } from "@/services/auth/getUserInfo";
import { DashboardNavbarContent } from "./DashboardNavbarContent";
import { UserInfo } from "@/types/userInterface";

export const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;

  return <DashboardNavbarContent userInfo={userInfo} />;
};
