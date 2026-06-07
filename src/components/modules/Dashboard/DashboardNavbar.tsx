import { getUserInfo } from "@/services/auth/getUserInfo";
import { DashboardNavbarContent } from "./DashboardNavbarContent";
import { UserInfo } from "@/types/userInterface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";

export const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  const navItems = getNavItemsByRole(userInfo?.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      dashboardHome={dashboardHome}
      navItems={navItems}
    />
  );
};
