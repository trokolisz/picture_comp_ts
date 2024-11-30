"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export default function NavMenu() {
  return (
    <NavigationMenu className="flex flex-col md:flex-row">
      <NavigationMenuList className="flex flex-col md:flex-row">
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent hover:bg-gray-200 text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent hover:bg-gray-200 text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/map" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent hover:bg-gray-200 text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Map
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/login" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent hover:bg-gray-200 text-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Log in
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}