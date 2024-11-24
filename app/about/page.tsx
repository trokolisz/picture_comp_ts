'use client'; 

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; 

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 text-center relative">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6">
        <button className="p-2 text-[#52be80] hover:text-[#45a469]">
          <ArrowLeft size={24} />
        </button>
      </Link>

      <h1 className="text-4xl font-bold text-[#52be80] mb-4">About Us</h1>
      <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
        Welcome to our Picture Competition platform! We are passionate about
        bringing people together through the art of photography and creating
        exciting challenges. Our mission is to foster creativity and friendly
        competition, allowing participants to showcase their skills and gain
        recognition.
      </p>

      <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
        Our platform is designed to be user-friendly and inclusive for all
        photographers, whether amateur or professional. We strive to offer
        unique and engaging competitions that inspire innovation and community.
      </p>

      <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
        If you have any questions about the competition or the platform, feel
        free to get in touch with us via our Contact page!
      </p>
    </div>
  );
};

export default AboutPage;
