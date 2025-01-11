import React from "react";
import SchoolCard from "./components/Schools";
import ProfileCard from "./components/PrincipalCard";

const AssociateSchools = () => {
  const schools = [
    { imgSrc: "/img/kpsbarasat.png", altText: "KPS Barasat" },
    { imgSrc: "/img/CMSBf.png", altText: "CMS BF" },
    { imgSrc: "/img/xpx.png", altText: "XPX" },
    { imgSrc: "/img/kps.png", altText: "KPS" },
  ];

  return (
    <section className="p-10">
      <h2 className="text-[#101010] text-center text-4xl underline underline-offset-8 decoration-[#789336]">
        Our Schools
      </h2>
      <div className=" flex flex-col md:flex-row items-center justify-center md:justify-evenly">
        {schools.map((school, index) => (
          <SchoolCard
            key={index}
            imgSrc={school.imgSrc}
            altText={school.altText}
          />
        ))}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0">
        <div>
          <h2 className="text-[#101010] text-4xl underline underline-offset-8 decoration-[#789336]">
            Get to Know Us
          </h2>
          <h3 className="mt-5 text-xl">
            Pioneer in education field since{" "}
            <span className="text-[#789336]">1987</span>
          </h3>
          <p>
            Angel Education Society was established in 1987. The founder as well
            as the president of the above-mentioned educational organization was
            late Gouri Roy. Her hearty achievements cannot be expressed in
            words. Her holistic, hearty, authentic and humanistic approach made
            this organization a success and the best in the entire of Nadia,
            which will lead this organization to its best future. Today Angel
            Education Society has been able to strengthen its base and spread
            wings with the help of board members of this organization. They have
            always the best innovative ideas.
          </p>
        </div>
        <div>
          <ProfileCard
            imageSrc="/img/event.png"
            altText="Principal's picture"
          />
        </div>
      </div> */}
    </section>
  );
};

export default AssociateSchools;
