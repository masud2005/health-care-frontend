import { getUserInfo } from "@/services/auth/getUserInfo";
import { DashboardSidebarContent } from "./DashboardSidebarContent";
import { UserInfo } from "@/types/userInterface";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

export const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);
  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      dashboardHome={dashboardHome}
      navItems={navItems}
    />
  );
};
