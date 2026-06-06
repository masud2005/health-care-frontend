import Link from "next/link";

export const DashboardSidebarContent = () => {
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href={""} className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Health Care</span>
        </Link>
      </div>
    </div>
  );
};