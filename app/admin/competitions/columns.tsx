"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export type Competition = {
  name: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  num_judges: number
  num_teams: number
}

export const columns: ColumnDef<Competition>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div
        style={{
          backgroundColor: "#52be80", 
          color: "white",              
          padding: "10px 15px",        
          fontWeight: "bold",          
          textAlign: "center",         
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",          
          width: "100%"               
        }}
      >
         <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        style={{
          marginRight: "10px", 
          verticalAlign: "middle" 
        }}
      />
      Select All
    </div>
  ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        style={{
          backgroundColor: row.getIsSelected() ? "#52be80" : "", 
          borderColor: row.getIsSelected() ? "#52be80" : "",     
          color: row.getIsSelected() ? "white" : "",              
        }}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => (
      <div
        style={{
          backgroundColor: "#52be80",
          color: "white",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Name
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: () => (
      <div
        style={{
          backgroundColor: "#52be80",
          color: "white",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Description
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "start_date",
    header: () => (
      <div
        style={{
          backgroundColor: "#52be80",
          color: "white",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Start Date
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("start_date")}</div>,
  },
  {
    accessorKey: "end_date",
    header: () => (
      <div
        style={{
          backgroundColor: "#52be80",
          color: "white",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        End Date
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("end_date")}</div>,
  },
  {
    accessorKey: "is_active",
    header: () => (
      <div
        style={{
          backgroundColor: "#52be80",
          color: "white",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Active
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.getValue("is_active") ? "Active" : "Inactive"}</div>
    ),
  },
  {
    accessorKey: "num_judges",
    header: () => (
      <div
        style={{
          backgroundColor: "#52be80",
          color: "white",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Number of Judges
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("num_judges")}</div>,
  },
  {
    accessorKey: "num_teams",
    header: () => (
      <div
        style={{
          backgroundColor: "#52be80",
          color: "white",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        Number of Teams
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("num_teams")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const competition = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(competition.name)}
            >
              Copy competition name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.location.href = `/admin/competitions/${competition.name}`}>
              View competition details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

