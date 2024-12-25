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
      <div>
        <AchievementCard />
      </div>
    </section>
  );
};

export default Perks;
