// import Image from "next/image";
import React from "react";
import ProfileCard from "./components/PrincipalCard";

const PrincipalDesk = () => {
  return (
    <section className="bg-[#FFFFFF] p-10">
      <div>
        <h2 className="text-center text-[#101010] text-4xl underline underline-offset-8">
          From the Principle's Desk
        </h2>
        <div className="grid grid-cols-2 p-10">
          <div>
            <ProfileCard
              imageSrc="/img/principal.png"
              name="Mrs. Rupa Dey"
              designation="Principal and Academic Director (AES)"
              altText="Principal's picture"
            />
          </div>
          <div className="text-[#101010] text-sm">
            <p>
              We at the Kalyani Public School endeavor to enhance the child's
              emotional, Physical and intellectual development through a sound
              educational programme to meet the challenges. The faculty members
              are fully trained and dedicated professionals providing resources
              for learners and enabling them to decide how to learn and why to
              learn. Our aim is to hold the leading torch and to become the
              pioneers in all aspect of education.
            </p>
            <p>
              We help the young minds grow in a harmonious environment resulting
              in all-round development of the child. We are certain that all
              students who join the school will step out as confident ones to
              meet higher challenges. We look forward to welcoming your child to
              Kalyani Public School.
            </p>
            <p>
              The managing committee is also conscious of their duty in
              providing better teaching, learning environment and infrastructure
              to the students and staff for better and harmonious tomorrow. Come
              and see the school in action, I am confident that you will
              discover an environment in which you would like your child to grow
              up as a perfect human being.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalDesk;
