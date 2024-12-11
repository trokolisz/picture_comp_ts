import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    description: "New team 'PhotoHunters' joined Spring Competition",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    description: "Judge Sarah approved 5 photos in Nature Walk",
    timestamp: "3 hours ago",
  },
  {
    id: 3,
    description: "New competition 'City Landmarks' created",
    timestamp: "5 hours ago",
  },
  {
    id: 4,
    description: "Team 'Pixel Perfect' submitted 3 new photos",
    timestamp: "6 hours ago",
  },
  {
    id: 5,
    description: "User registration approved for John Doe",
    timestamp: "8 hours ago",
  },
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex justify-between items-start">
            <p className="text-sm text-gray-600">{activity.description}</p>
            <span className="text-xs text-gray-400">{activity.timestamp}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}