'use client';

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 
import dynamic from "next/dynamic";
import { useRole } from '@/hooks/use-role';

const MapComponentGoogle = dynamic(() => import("@/components/MapComponentGoogle"), { ssr: false });

export default function StatisticsSection() {
  useRole('admin');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 text-center relative">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6">
        <button className="p-2 text-[#52be80] hover:text-[#45a469]">
          <ArrowLeft size={24} />
        </button>
      </Link>
      <MapComponentGoogle />
    </div>
  );
};
