import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import LightDarkSwitch  from "@/components/light-dark-switch";





export default function Home() {
  return (
    <div className="grid shad">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shad">
        <div className="flex items-center gap-2 px-4 shad">
          <Separator orientation="vertical" className="mr-2 h-4 shad" />
          <Breadcrumb className="shad">
        <BreadcrumbList className="shad">
          <BreadcrumbItem className="hidden md:block shad">
            <BreadcrumbLink href="#" className="shad">
          Home
            </BreadcrumbLink>
          </BreadcrumbItem>                
        </BreadcrumbList>
          </Breadcrumb>       
        </div>
        <div className="flex-grow" />
        <LightDarkSwitch />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 shad">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 shad">
          <div className="aspect-video rounded-xl bg-muted/50 shad" />
          <div className="aspect-video rounded-xl bg-muted/50 shad" />
          <div className="aspect-video rounded-xl bg-muted/50 shad" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min shad" />
      </div>
      <Dialog>
        <DialogContent className="shad">
          <DialogHeader className="shad">
            <DialogTitle className="shad">Are you absolutely sure?</DialogTitle>
            <DialogDescription className="shad">
              This action cannot be undone. Are you sure you want to permanently
              delete this file from our servers?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="shad">
            <Button type="submit" className="shad">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
