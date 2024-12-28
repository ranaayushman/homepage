// Additional.tsx
import React from "react";
import { useFormContext } from "react-hook-form";

const Additional = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Emergency Contact
            </label>
            <input
              {...register("emergencyContact")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Emergency Contact Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Emergency Contact Number
            </label>
            <input
              {...register("emergencyPhone")}
              type="tel"
              className="w-full p-2 border rounded"
              placeholder="Emergency Contact Phone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              {...register("additionalNotes")}
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Any additional information..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additional;
