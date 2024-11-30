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

// Define the User type with isJudgePending as an optional property
export type User = {
  username: string
  full_name: string
  email: string
  is_active: boolean
  password: string
  role: string
  created_at: string
  updated_at: string
  isJudgePending?: boolean // Optional property for judge status
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

      const handleBan = async (username: string, isActive: boolean) => {
        try {
          const action = isActive ? 'ban' : 'unban';
          const response = await fetch(`/api/users/${username}/${action}`, {
            method: 'POST',
          });
          if (response.ok) {
            alert(`User ${username} has been ${action}ed.`);
          } else {
            alert(`Failed to ${action} user ${username}`);
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while banning the user.");
        }
      };

      const handleRoleChange = async (username: string, currentRole: string) => {
        try {
          const newRole = currentRole === 'competitor' ? 'judge' : 'competitor';
          const response = await fetch(`/api/users/${username}/role`, {
            method: 'POST',
            body: JSON.stringify({ role: newRole }),
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          if (response.ok) {
            alert(`User ${username} is now a ${newRole}`);
          } else {
            alert(`Failed to change role for user ${username}`);
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while changing the role.");
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete(user.username)}>
              Delete user
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBan(user.username, user.is_active)}>
              {user.is_active ? "Ban user" : "Unban user"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange(user.username, user.role)}>
              Change role to {user.role === "competitor" ? "Judge" : "Competitor"}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => (window.location.href = `/admin/users/${user.username}`)}>
              View user details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]
