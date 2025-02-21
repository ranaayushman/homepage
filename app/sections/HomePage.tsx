import React from "react";
import KalyaniForm from "./KalyaniForm";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AcademicCard from "./components/AcademicCard";

const HomePage = () => {
  return (
    <section className="grid grid-cols-1 gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <KalyaniForm />
        </div>
        <div className="relative overflow-hidden hidden md:block">
          <Image
            src={"/img/students.png"}
            width={1000}
            height={1000}
            alt={"kalyani"}
            className="rounded-bl-[200px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 px-4 md:px-12 gap-8">
        <div className="relative mx-auto md:mx-0 mb-8 md:mb-0">
          <div className="absolute top-10 left-4 md:left-32 w-1/2 h-5/6 bg-[#2E2A5A] rounded-md z-0"></div>
          <div className="relative z-10">
            <Image
              src={"/img/gal.png"}
              width={400}
              height={300}
              alt={"Kalyani Public School Gate"}
              className="rounded-md shadow-md relative left-8 md:left-40 max-w-[280px] md:max-w-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 md:px-0">
          <h1 className="text-3xl md:text-4xl font-light text-[#2E2A5A] text-center md:text-left">
            Welcome to <br />
            <span className="font-semibold">Kalyani Public School</span>
          </h1>
          <p className="text-sm text-gray-600 mt-4 mb-6 leading-relaxed text-center md:text-left">
            With the implicit faith in the Principles of dedication, diligence
            and discipline, Kalyani Public School formed educational institution
            imparting quality education with a humanitarian approach.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button className="bg-white text-[#2E2A5A] border border-[#2E2A5A] px-6 py-2 text-sm rounded hover:bg-gray-100 transition-colors">
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#2F2E6B] w-full">
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
    </section>
  );
};

export default HomePage;
