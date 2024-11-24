'use client'; 

import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Link from "next/link"; 
import { ArrowLeft } from "lucide-react"; 

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Your message has been sent! We will get back to you shortly.", {
      position: "top-center",
      autoClose: 5000,  
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 text-center relative">
      {/* Back Button */}
      <Link href="/" className="absolute top-6 left-6">
        <button className="p-2 text-[#52be80] hover:text-[#45a469]">
          <ArrowLeft size={24} />
        </button>
      </Link>

      <h1 className="text-4xl font-bold text-[#52be80] mb-4">Contact Us</h1>
      <p className="text-lg text-gray-800 mb-8">
        We would love to hear from you! If you have any questions, feedback, or inquiries,
        please feel free to reach out to us through the form below.
      </p>

      {/* Contact Form */}
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
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
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#52be80] text-white font-semibold rounded-md hover:bg-[#45a469]"
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

      {/* ToastContainer to display the toast message */}
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
