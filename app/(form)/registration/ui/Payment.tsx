// Payment.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
// import {onNext} from ""

interface PaymentProps {
  onNext: () => void;
}
const Payment = ({ onNext }: PaymentProps) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <input
              {...register("cardNumber")}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="**** **** **** ****"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <input
                {...register("expiryDate")}
                type="text"
                className="w-full p-2 border rounded"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                {...register("cvv")}
                type="text"
                className="w-full p-2 border rounded"
                placeholder="***"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
