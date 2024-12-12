import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trophy, Camera } from "lucide-react"
import { getCompetitions } from "@/lib/db"
import Head from "@/components/header"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default async function Page() {

  const competitions = await getCompetitions();
  let activeCompetitions = 0;
  let pendingPhotos = 0;
  let ratedPhotos = 0;

  if (!competitions) {
    return <div>No competitions</div>;
  }
  for (const comp of Object.values(competitions)) {
    if (comp.is_active) {
      activeCompetitions++;
    }
    if(comp.teams) {
      for (const team of Object.values(comp.teams)) {
        if (team.photos) {
          for (const photo of Object.values(team.photos)) {
            if (!photo.scores) {
              pendingPhotos++;
            } else {
              ratedPhotos++;
            }
          }
        }
      }
    }
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Head data="judge" />
        </div>
      </header>

      <div className="space-y-8">
      <h1 className="text-3xl font-bold">Judge Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCompetitions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Photos</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPhotos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rated Photos</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ratedPhotos}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Active Competitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.values(competitions)
              .filter(comp => comp.is_active)
              .map((comp, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{comp.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {comp.teams ? Object.keys(comp.teams).length : 0} teams participating
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ends {new Date(comp.end_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
      
    </>
  )
}
