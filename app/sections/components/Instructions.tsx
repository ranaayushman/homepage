import React from "react";

const Instructions = () => {
  return (
    <div>
      <div className="flex flex-col justify-between gap-3 text-sm">
        <h2 className="text-[#FF7245] text-2xl">Instructions</h2>
        <p>
          1. For any difficulty/ query, parents can also mail us to
          kps.admissions111@gmail.com or <br /> Call
          to +91-9748215457 / +91-7384130790 / +91-9875333264
        </p>
        <p>
          2. <span className="font-semibold">Admission Form: Rs.500/- </span>,
          you will be redirected to Payment Gateway after submission and follow
          steps to complete the Admission Form Process
        </p>
        <p>
          <span className="font-semibold">Parent Declaration:</span> I do hereby
          declare that the above statements are true and correct by all means
          and also undertake to abide by the Rules & Regulation of the
          Institution panel set by the management, as stated in the prospectus.
          I also agree to abide by the Rules & Regulations of the school as and
          when amended time to time. I agree that payment made by me will not be
          refunded or adjusted under any circumstances by the Institution
          authority.
        </p>
      </div>
    </div>
  );
};

export default Instructions;
