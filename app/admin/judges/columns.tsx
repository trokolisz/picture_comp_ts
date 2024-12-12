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

export type User = {
  username: string
  full_name: string
  email: string
  is_active: boolean
  password: string
  role: string
  created_at: string
  updated_at: string
}

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
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
        Username
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "full_name",
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
        Full Name
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
  },
  {
    accessorKey: "email",
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
        Email
      </div>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
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
    accessorKey: "role",
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
        Role
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "created_at",
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
        Created At
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
  },
  {
    accessorKey: "updated_at",
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
        Updated At
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("updated_at")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
  
      // Kitörlés
      const handleDelete = async (username: string) => {
        try {
          const response = await fetch(`/api/users/${username}`, { method: 'DELETE' });
          const data = await response.json();
          if (response.ok) {
              alert(data.message || `User ${username} has been deleted.`);
          } else {
              alert(data.message || `Failed to delete user ${username}`);
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while deleting the user.");
        }
      };
  
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/*Felesleges és ront a kinézeten*/}
            {/*</DropdownMenuContent>DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.username)}
            >
              Copy judge name
            </DropdownMenuItem>*/}
            <DropdownMenuSeparator />
            {/*Törlés művelet*/}
            <DropdownMenuItem
              onClick={() => handleDelete(user.username)}
            >
              Delete judge
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => (window.location.href = `/admin/users/${user.username}`)}
            >
              View judge details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]

