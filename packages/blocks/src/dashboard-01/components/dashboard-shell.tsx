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
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-6 p-6">
            <MetricCards />
            <RevenueChart />
            <RecentSalesTable />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
