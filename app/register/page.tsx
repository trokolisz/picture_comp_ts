'use client'; 

import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 
import { RegisterForm } from "@/components/register-form";

export default function Page() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center px-4">
      <Link href="/" className="absolute top-6 left-6">
        <button className="p-2 text-[#52be80] hover:text-[#45a469]">
          <ArrowLeft size={24} />
        </button>
      </Link>

      <RegisterForm />
    </div>
  );
}