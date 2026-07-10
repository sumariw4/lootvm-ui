"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sales = [
  { name: "Premium Plan", category: "Subscription", status: "Live", sales: 245, revenue: "$12,250" },
  { name: "Starter Kit", category: "Product", status: "Live", sales: 189, revenue: "$9,450" },
  { name: "Enterprise", category: "Subscription", status: "Draft", sales: 42, revenue: "$21,000" },
  { name: "Add-on Pack", category: "Product", status: "Live", sales: 156, revenue: "$4,680" },
  { name: "Consulting", category: "Service", status: "Archived", sales: 28, revenue: "$14,000" },
];

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Live" ? "default" : status === "Draft" ? "secondary" : "outline";
  return <Badge variant={variant}>{status}</Badge>;
}

export function RecentSalesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>Overview of your top performing items</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell className="text-right">{row.sales}</TableCell>
                <TableCell className="text-right">{row.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
