'use client'; 

import React from "react";
import Link from "next/link"; 
import { ArrowLeft } from "lucide-react"; 

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 text-center relative">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6">
        <button className="p-2 text-[#52be80] hover:text-[#45a469]">
          <ArrowLeft size={24} />
        </button>
      </Link>

      <h1 className="text-4xl font-bold text-[#52be80] mb-4">Contact Us</h1>
      <p className="text-lg text-gray-800 mb-8 max-w-2xl mx-auto">
        We would love to hear from you! If you have any questions, feedback, or inquiries,
        please feel free to reach out to us through the form below.
      </p>

      {/* Contact Form */}
      <div className="max-w-lg mx-auto">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-[450px] mt-2 px-6 py-4 text-lg border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-[450px] mt-2 px-6 py-4 text-lg border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6} 
              required
              className="w-[450px] mt-2 px-6 py-4 text-lg border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-[450px] py-3 bg-[#52be80] text-white font-semibold rounded-md hover:bg-[#45a469]"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="mt-12">
        <p className="text-lg text-gray-800">
          You can also reach us at:
        </p>
        <p className="text-lg text-gray-800">
          Email: <a href="mailto:info@yourcompany.com" className="text-[#52be80]">info@yourcompany.com</a>
        </p>
        <p className="text-lg text-gray-800">
          Phone: <a href="tel:+1234567890" className="text-[#52be80]">+1 (234) 567-890</a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;