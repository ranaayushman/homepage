import { Facebook, Youtube, Instagram } from "lucide-react";
import React from "react";

const Location: React.FC = () => {
  return (
    <div
      className="relative w-full pt-12 bg-cover bg-center rounded-tl-[150px] rounded-tr-[150px]"
      style={{ backgroundImage: "url('/img/footer.jpg')" }}
    >
      {/* Glassmorphism Effect Overlay */}
      <div className="absolute inset-0 bg-[#292B5F]/70 backdrop-blur-md rounded-tl-[150px] rounded-tr-[150px] border border-white/10 shadow-lg"></div>

      <div className="relative mx-auto px-4">
        {/* Content Cards with Glassmorphism */}
        <div className="flex flex-col md:flex-row gap-8 p-10 justify-between">
          {/* Left Section - Address & Social Media */}
          <div className="md:w-1/3 p-6 rounded-xl">
            <h2 className="text-4xl font-thin mb-2 text-white">
              How to <span className="font-semibold">Locate</span> us?
            </h2>
            <p className="text-white mb-2">
              486, B-4, Block B, Kalyani, West Bengal 741235
            </p>
            <p className="font-medium mb-2 text-white">
              FIND US ON SOCIAL MEDIA
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center bg-blue-600/80 text-white rounded-full backdrop-blur-sm hover:bg-blue-600 transition-all duration-300"
              >
                <Facebook size={26} />
              </a>
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center bg-red-600/80 text-white rounded-full backdrop-blur-sm hover:bg-red-600 transition-all duration-300"
              >
                <Youtube size={26} />
              </a>
              <a
                href="#"
                className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-full backdrop-blur-sm hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                <Instagram size={26} />
              </a>
            </div>
          </div>

          {/* Middle Section - Contact Info */}
          <div className="md:w-1/3  p-6 rounded-xl text-white">
            <h2 className="text-xl font-light mb-6">Contact us</h2>
            <ul className="space-y-2">
              <li>+91-7980396853</li>
              <li>033 2582 8316</li>
              <li>033 2580 8619</li>
              <li>kcms_1971@yahoo.com</li>
            </ul>
            <a href="#" className="mt-4 inline-block text-white underline">
              Privacy policy
            </a>
          </div>

          {/* Right Section - Google Map */}
          <div className="md:w-1/3 h-60 relative bg-white/10 p-2 rounded-xl border border-white/20 shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672!2d88.42999445767143!3d22.969603349895074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU4JzEwLjYiTiA4OMKwMjUnNDcuOSJF!5e0!3m2!1sen!2sin!4v1708538330404!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 rounded-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <p className="text-center text-white mt-6 pb-6">
          © 2024 techsupport@Kiwi Ed-Tech All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Location;
