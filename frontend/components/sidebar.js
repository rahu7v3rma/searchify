"use client";

import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "../assets/icons/dashboard";
import KeywordToolIcon from "../assets/icons/keyword-tool";
import LogoutIcon from "../assets/icons/logout";
import { useLoader } from "../context/loader";
import { useToast } from "../context/toast";
import { useUser } from "../context/user";
import { removeCookie } from "../utils/cookie";
import { Heading4 } from "./heading";
import { callApi } from "../lib/api";

const SidebarItem = ({ icon, text, path, onClick }) => {
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
  const { setUser } = useUser();

  const { setLoading } = useLoader();
  const { showToast } = useToast();
  const router = useRouter();

  return (
    <div className="w-80 h-full pb-12 pt-2 pl-2">
      <div className="border border-primary-border h-full rounded-md p-2 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <SidebarItem
            icon={<DashboardIcon />}
            text="Dashboard"
            path={"/dashboard"}
          />
          <SidebarItem
            icon={<KeywordToolIcon />}
            text="Google Keyword Tool"
            path={"/google-keyword-tool"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <SidebarItem
            icon={<LogoutIcon />}
            text="Logout"
            onClick={async () => {
              setLoading(true);
              const response = await callApi("/user/logout", "POST");
              if (response.success) {
                setUser(null);
                removeCookie("searchify.api.access_token");
                showToast("Logged out successfully");
                router.push("/login");
              }
              setLoading(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
