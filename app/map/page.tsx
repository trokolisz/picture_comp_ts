'use client';

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 
import dynamic from "next/dynamic";

const MapComponentGoogle = dynamic(() => import("@/components/MapComponentGoogle"), { ssr: false });

const Map = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 text-center relative">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6">
        <button className="p-2 text-[#52be80] hover:text-[#45a469]">
          <ArrowLeft size={24} />
        </button>
      </Link>

      <MapComponentGoogle/>

      <style jsx>{`
        .filter-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
        }
        .filter-label {
          font-size: 1.2em;
          margin-bottom: 10px;
        }
        .filter-select {
          padding: 5px 10px;
          font-size: 1em;
        }
      `}</style>
    </div>
  );
};

export default Map;
