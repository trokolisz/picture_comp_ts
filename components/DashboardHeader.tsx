'use client';

interface DashboardHeaderProps {
  lastUpdated: string;
}

export function DashboardHeader({ lastUpdated }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
} 