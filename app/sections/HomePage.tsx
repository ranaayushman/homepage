"use client";
import React, { useEffect } from "react";
import KalyaniForm from "./KalyaniForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AcademicCard from "./components/AcademicCard";
import Skills from "./components/Skills";
import Location from "./components/Location";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  // Array of carousel images with paths and alt tags
  const carouselImages = [
    { path: "/img/students.png", alt: "Students at Kalyani Public School" },
    { path: "/img/campus.png", alt: "Kalyani Public School Campus" },
    { path: "/img/classroom.png", alt: "Modern Classrooms" },
    { path: "/img/activities.png", alt: "Student Activities" },
  ];

  // Array of gate images with paths and alt tags
  const gateImages = [
    { path: "/img/gal.png", alt: "Kalyani Public School Gate" },
    { path: "/img/gal.png", alt: "Kalyani Public School Main Entrance" },
    { path: "/img/gal.png", alt: "Kalyani Public School Campus View" },
  ];

  // State to track current image indices
  const [currentCarouselIndex, setCurrentCarouselIndex] = React.useState(0);
  const [currentGateIndex, setCurrentGateIndex] = React.useState(0);

  // Auto-carousel effect for hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Animation effect for gate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGateIndex((prevIndex) =>
        prevIndex === gateImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change gate image every 6 seconds

    return () => clearInterval(interval);
  }, [gateImages.length]);

  return (
    <section className="grid grid-cols-1 gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Carousel Implementation */}
        <div className="relative overflow-hidden hidden md:block h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCarouselIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Image
                src={carouselImages[currentCarouselIndex].path}
                width={1000}
                height={1000}
                alt={carouselImages[currentCarouselIndex].alt}
                className="rounded-br-[200px] h-full object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  currentCarouselIndex === index ? "bg-white" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
        <div>
          <KalyaniForm />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 px-4 md:px-12 gap-8">
        {/* Gate Animation Section - Preserving original dimensions */}
        <div className="relative mx-auto md:mx-0 mb-8 md:mb-0">
          {/* Fixed background block - Keeping original dimensions */}
          <div className="absolute top-10 left-4 md:left-32 w-1/2 h-5/6 bg-[#2E2A5A] rounded-md z-0"></div>

          {/* Animated image container with preserved positioning */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentGateIndex}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
              >
                <Image
                  src={gateImages[currentGateIndex].path}
                  width={400}
                  height={300}
                  alt={gateImages[currentGateIndex].alt}
                  className="rounded-md shadow-md relative left-8 md:left-40 max-w-[280px] md:max-w-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl font-light text-[#101010] text-center md:text-left">
            Welcome to <br />
            <span className="font-semibold">Kalyani Public School</span>
          </h1>
          <p className="text-sm text-gray-600 mt-4 mb-6 leading-relaxed text-center md:text-left">
            With the implicit faith in the Principles of dedication, diligence
            and discipline,
            <br /> Kalyani Public School formed educational institution
            imparting quality <br /> education with a humanitarian approach.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button className="bg-white text-[#2E2A5A] border border-[#2E2A5A] px-6 py-2 text-sm rounded hover:bg-[#353478] hover:text-white transition-colors">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#292B5F] w-full">
        <p className="text-white text-center pt-8">
          An International education focused on each and every child
        </p>
        <h2 className="text-2xl text-white text-center">Academics</h2>
        <div className="flex justify-evenly p-8">
          <AcademicCard
            imgSrc="/img/child_1.png"
            altText="Pre School"
            text="Pre-School"
          />
          <AcademicCard
            imgSrc="/img/primary.png"
            altText="Primary"
            text="Primary"
          />
          <AcademicCard
            imgSrc="/img/secondary.png"
            altText="Secondary"
            text="Secondary"
          />
        </div>
      </div>
      <Skills />
      <Location />
    </section>
  );
};

export default HomePage;
