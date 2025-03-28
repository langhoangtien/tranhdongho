"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useMatchRoute, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      isActive?: boolean;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

type NavItemProps = {
  title: string;
  url: string;

  isActive?: boolean;
  icon?: LucideIcon;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
};

const NavItem = ({ item }: { item: NavItemProps }) => {
  const matchRoute = useMatchRoute();
  const routerState = useRouterState();

  const active = routerState.location.pathname.startsWith(item.url);
  const [openMenu, setOpenMenu] = useState(active);

  useEffect(() => {
    if (!active) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerState.location]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  if (!item.items)
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[active=true]:text-primary"
          isActive={active}
          tooltip={item.title}
        >
          <Link to={item.url}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  return (
    <Collapsible
      key={item.title}
      asChild
      open={item.items && openMenu}
      onOpenChange={setOpenMenu}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            size="lg"
            className="data-[active=true]:text-primary"
            isActive={active}
            tooltip={item.title}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight
              strokeWidth={1.25}
              className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton
                  size="md"
                  isActive={!!matchRoute({ to: subItem.url })}
                  asChild
                >
                  <Link to={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};
