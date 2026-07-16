"use client";

import * as React from "react";
import {
  AudioWaveform,
  BarChart3,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Package,
  Settings2,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

const data = {
  user: {
    name: "John Doe",
    email: "john@lootvm.dev",
    avatar: "",
  },
  teams: [
    { name: "LootVM", logo: GalleryVerticalEnd, plan: "Enterprise" },
    { name: "Acme Corp", logo: AudioWaveform, plan: "Startup" },
    { name: "Evil Corp", logo: Command, plan: "Free" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Statistics",
      url: "#",
      icon: BarChart3,
      items: [
        { title: "Overview", url: "#" },
        { title: "Reports", url: "#" },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Package,
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
      ],
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
