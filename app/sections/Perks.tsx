import React from "react";
import PerksComponent from "./components/PerksComponent";
import AchievementCard from "./components/AchievementCard";

const Perks = () => {
  const perksData = [
    {
      imageSrc: "/svg/perks.svg",
      title: "Pioneer in education field since",
      highlightedText: "1987",
      description:
        "Angel Education Society was established in 1987. The founder as well as the president of the above-mentioned educational organization was late Gouri Roy. Her hearty achievements cannot be expressed in words. Her holistic, hearty, authentic and humanistic",
    },
    {
      imageSrc: "/svg/perks.svg",
      title: "Pioneer in education field since",
      highlightedText: "1987",
      description:
        "Angel Education Society was established in 1987. The founder as well as the president of the above-mentioned educational organization was late Gouri Roy. Her hearty achievements cannot be expressed in words. Her holistic, hearty, authentic and humanistic",
    },
    {
      imageSrc: "/svg/perks.svg",
      title: "Pioneer in education field since",
      highlightedText: "1987",
      description:
        "Angel Education Society was established in 1987. The founder as well as the president of the above-mentioned educational organization was late Gouri Roy. Her hearty achievements cannot be expressed in words. Her holistic, hearty, authentic and humanistic",
    },
    {
      imageSrc: "/svg/perks.svg",
      title: "Pioneer in education field since",
      highlightedText: "1987",
      description:
        "Angel Education Society was established in 1987. The founder as well as the president of the above-mentioned educational organization was late Gouri Roy. Her hearty achievements cannot be expressed in words. Her holistic, hearty, authentic and humanistic",
    },
  ];

  return (
    <section className=" p-10 pt-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {perksData.map((perk, index) => (
          <PerksComponent
            key={index}
            imageSrc={perk.imageSrc}
            title={perk.title}
            highlightedText={perk.highlightedText}
            description={perk.description}
          />
        ))}
      </div>
      <div className="bg-[#E3E5DD] p-4 ">
        <div className="mb-4">
          <h2 className="text-[#101010] text-2xl underline decoration-[#789336]">Our Achievements</h2>
          <hr />
        </div>
        <div className="flex justify-between gap-x-4">
          <AchievementCard
            imgHeight={400}
            imgSrc="/img/one.png"
            imgWidth={400}
          />
          <AchievementCard
            imgHeight={400}
            imgSrc="/img/two.png"
            imgWidth={400}
          />
          <AchievementCard
            imgHeight={400}
            imgSrc="/img/three.png"
            imgWidth={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Perks;
