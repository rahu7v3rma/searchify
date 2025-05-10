"use client";

import { usePathname, useRouter } from "next/navigation";
import KeywordToolIcon from "../assets/icons/keyword-tool";
import { paths } from "../constants/paths";
import { Heading4 } from "./heading";
import LogoutIcon from "../assets/icons/logout";
import useUser from "../hooks/user";
import DashboardIcon from "../assets/icons/dashboard";

const SidebarItem = ({
  icon,
  text,
  path,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  path?: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`flex items-center gap-2 rounded-md px-4 py-2 cursor-pointer hover:bg-secondary-background transition-colors ${
        pathname === path ? "bg-secondary-background" : ""
      }`}
      onClick={() => {
        if (path) {
          router.push(path);
          return;
        }
        if (onClick) {
          onClick();
          return;
        }
      }}
    >
      <div className="w-6 h-6">{icon}</div>
      <Heading4 text={text} />
    </div>
  );
};

export default function Sidebar() {
  const { logout } = useUser();
  return (
    <div className="w-80 h-full pb-12 pt-2 pl-2">
      <div className="border border-primary-border h-full rounded-md p-2 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <SidebarItem
            icon={<DashboardIcon />}
            text="Dashboard"
            path={paths.dashboard}
          />
          <SidebarItem
            icon={<KeywordToolIcon />}
            text="Google Keyword Tool"
            path={paths.googleKeywordTool}
          />
        </div>
        <div className="flex flex-col gap-2">
          <SidebarItem
            icon={<LogoutIcon />}
            text="Logout"
            onClick={() => {
              logout();
            }}
          />
        </div>
      </div>
    </div>
  );
}
