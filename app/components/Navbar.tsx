"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@clerk/nextjs";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const session=useSession()
  const user=session.isSignedIn
  console.log(user)
  useEffect(() => {

    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Do not render until mounted to avoid hydration issues
  }

  return (
    <div className="border border-gray-400 w-full h-[4rem] p-4 px-6 dark:bg-white dark:text-black">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="mr-2">Logo</p>
          <Link href={"/home"}>
          <div className="font-bold text-2xl">PlayPals</div>
          </Link>
        </div>

        <div className="flex items-center">
          {/* Theme toggle button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5 text-white" />
            )}
          </Button>
          <Link href={"/sign-in"}>
          <Button className="bg-green-600 mr-2 text-white hover:bg-green-500 w-[4rem] ml-4">
            Sign In
          </Button>
          </Link>
          <Link href={"/sign-up"}>
          <Button className="bg-green-600 text-white hover:bg-green-500 w-[5rem]">
            Login
          </Button>
          </Link>
          {user}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
