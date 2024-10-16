import { SignIn } from "@clerk/nextjs";

// import { SignIn } from '@clerk/nextjs'
export default function Page() {
  return <SignIn />
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fullscreen, Trophy } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { syncUserWithDb } from "@/lib/SyncUserWithDb";
import FormAuth from "@/app/components/AuthForm";

const SignInForm = () => {
  
  return (
      <div>
        <FormAuth isSignUp={false} />
      </div>
  );
};

export default SignInForm;
