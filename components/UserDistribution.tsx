'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types";

interface UserDistributionProps {
  users: Record<string, User>;
}

export function UserDistribution({ users }: UserDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['admin', 'judge', 'competitor'].map(role => {
            const count = Object.values(users)
              .filter(user => user.role === role).length;
            return (
              <div key={role} className="flex items-center justify-between">
                <div className="capitalize">{role}s</div>
                <div className="font-medium">{count} users</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 