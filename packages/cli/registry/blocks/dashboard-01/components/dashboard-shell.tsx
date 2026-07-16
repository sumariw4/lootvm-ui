"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { MetricCards } from "./metric-cards";
import { RecentSalesTable } from "./recent-sales-table";
import { RevenueChart } from "./revenue-chart";

export function DashboardShell() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <MetricCards />
          <RevenueChart />
          <RecentSalesTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
