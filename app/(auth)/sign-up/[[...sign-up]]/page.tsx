"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Fullscreen, Trophy } from "lucide-react";
import { useSignIn } from "@clerk/nextjs";
import { syncUserWithDb } from "@/lib/SyncUserWithDb";
import FormAuth from "@/app/components/AuthForm";

const SignUpForm = () => {
  
  return (
      <div>
        <FormAuth isSignUp={true} />
      </div>
  );
};

export default SignUpForm;
