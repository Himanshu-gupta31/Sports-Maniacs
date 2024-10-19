"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs"
import { Trophy, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="border-b border-gray-200 w-full p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Trophy className="mr-2" />
          <div className="font-bold text-xl sm:text-2xl">PlayPals</div>
        </div>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="mr-2"
          >
            {theme === "light" ? (
              <MoonIcon className="w-4 h-4" />
            ) : (
              <SunIcon className="w-4 h-4" />
            )}
          </Button>

          <div className="hidden sm:flex items-center space-x-2">
            <SignedOut>
              <Link href="/sign-in">
                <Button className="bg-green-600 text-white hover:bg-green-500">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-green-600 text-white hover:bg-green-500">
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/needpals">
                <Button className="bg-green-400 hover:bg-green-500">Need Pals</Button>
              </Link>
              <Link href="/connectwithpals">
                <Button className="bg-green-400 hover:bg-green-500">Connect With Pals</Button>
              </Link>
              <SignOutButton>
                <Button className="bg-red-600 text-white hover:bg-red-500">
                  Sign Out
                </Button>
              </SignOutButton>
            </SignedIn>
          </div>

          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <SignedOut>
                  <DropdownMenuItem>
                    <Link href="/sign-in">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/sign-up">Sign Up</Link>
                  </DropdownMenuItem>
                </SignedOut>
                <SignedIn>
                  <DropdownMenuItem>
                    <Link href="/needpals">Need Pals</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/connectwithpals">Connect With Pals</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutButton>Sign Out</SignOutButton>
                  </DropdownMenuItem>
                </SignedIn>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar