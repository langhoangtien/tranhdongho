import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ScrollText,
  SettingsIcon,
  ShirtIcon,
  UsersRound,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Người dùng",
      url: "/admin/users",
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: "Thêm mới",
          url: "/admin/users/create",
        },
        {
          title: "Danh sách",
          url: "/admin/users",
        },
      ],
    },
    {
      title: "Sản phẩm",
      url: "/admin/products",
      icon: ShirtIcon,
      items: [
        {
          title: "Thêm mới",
          url: "/admin/products/create",
        },
        {
          title: "Danh sách",
          url: "/admin/products",
        },
      ],
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: BookOpen,
      items: [
        {
          title: "Thêm mới",
          url: "/admin/reviews/create",
        },
        {
          title: "Danh sách",
          url: "/admin/reviews",
        },
      ],
    },
    {
      title: "Order",
      url: "/admin/orders",
      icon: ScrollText,
      items: [
        {
          title: "Thêm mới",
          url: "/admin/orders/create",
        },
        {
          title: "Danh sách",
          url: "/admin/orders",
        },
      ],
    },
    {
      title: "Cài đặt",
      url: "/admin/settings",
      icon: SettingsIcon,
      items: [
        {
          title: "Profile",
          url: "/admin/settings/profile",
        },
        {
          title: "Billing",
          url: "/admin/settings/billing",
        },
        {
          title: "Notifications",
          url: "/admin/settings/notifications",
        },
        {
          title: "Security",
          url: "/admin/settings/security",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
