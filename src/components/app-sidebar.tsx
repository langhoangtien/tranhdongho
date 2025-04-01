import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Command,
  FilePenLine,
  Frame,
  GalleryVerticalEnd,
  HomeIcon,
  MailIcon,
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
import { useAuth } from "@/auth";

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
      title: "App",
      url: "/admin",
      icon: HomeIcon,
    },
    {
      title: "Người dùng",
      url: "/admin/users",
      icon: UsersRound,
      isActive: true,
      items: [
        {
          title: "Danh sách",
          url: "/admin/users",
        },
        {
          title: "Thêm mới",
          url: "/admin/users/create",
        },
      ],
    },
    {
      title: "Sản phẩm",
      url: "/admin/products",
      icon: ShirtIcon,
      items: [
        {
          title: "Danh sách",
          url: "/admin/products",
        },
        {
          title: "Thêm mới",
          url: "/admin/products/create",
        },
      ],
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: BookOpen,
      items: [
        {
          title: "Danh sách",
          url: "/admin/reviews",
        },
        {
          title: "Thêm mới",
          url: "/admin/reviews/create",
        },
        {
          title: "Nhập đánh giá",
          url: "/admin/reviews/import",
        },
      ],
    },
    {
      title: "Order",
      url: "/admin/orders",
      icon: ScrollText,
      items: [
        {
          title: "Danh sách",
          url: "/admin/orders",
        },
        {
          title: "Thêm mới",
          url: "/admin/orders/create",
        },
      ],
    },
    {
      title: "Email",
      url: "/admin/emails",
      icon: MailIcon,
      items: [
        {
          title: "Danh sách",
          url: "/admin/emails",
        },
        {
          title: "Thêm mới",
          url: "/admin/emails/create",
        },
      ],
    },
    {
      title: "Blog",
      url: "/admin/blogs",
      icon: FilePenLine,
      items: [
        {
          title: "Danh sách",
          url: "/admin/blogs",
        },
        {
          title: "Thêm mới",
          url: "/admin/blogs/create",
        },
      ],
    },
    {
      title: "Cài đặt",
      url: "/admin/settings",
      icon: SettingsIcon,
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
  const auth = useAuth();
  if (!auth.isAuthenticated) return;

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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
