import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import Cookies from "js-cookie";

interface PaymentFormData {
  paymentMethod: string;
  paymentAmount: number;
  transactionId?: string;
}

interface PaymentProps {
  onNext: () => void;
  userId: string;
  applicationId: string;
  classId: string;
  tempNo?: string;
  schoolId?: string;
  paymentData?: any[];
}

const Payment = ({
  onNext,
  userId,
  applicationId,
  classId,
  tempNo,
  schoolId: providedSchoolId,
  paymentData,
}: PaymentProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PaymentFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const paymentMethod = watch("paymentMethod");
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  // Use either the provided schoolId or get it from cookies
  const [schoolId, setSchoolId] = useState<string | undefined>(
    providedSchoolId
  );

  useEffect(() => {
    // If schoolId prop is not provided, try to get it from cookies
    if (!providedSchoolId) {
      const cookieSchoolId = Cookies.get("schoolId");
      if (cookieSchoolId) {
        setSchoolId(cookieSchoolId);
      }
    }

    // Set default values from paymentData if available
    if (paymentData && paymentData.length > 0) {
      const latestPayment = paymentData[0];
      setValue("paymentMethod", latestPayment.paymentMethod || "cash");
      setValue("paymentAmount", latestPayment.paymentAmount || 500);
      if (latestPayment.transactionId) {
        setValue("transactionId", latestPayment.transactionId);
      }
    } else {
      // Set defaults
      setValue("paymentMethod", "cash");
      setValue("paymentAmount", 500);
    }
  }, [providedSchoolId, paymentData, setValue]);

  const onSubmitPayment = async (data: PaymentFormData) => {
    setIsSubmitting(true);
    try {
      // Use props first, then fall back to cookies if needed
      const finalApplicationId = applicationId || Cookies.get("applicationId");
      const finalSchoolId = schoolId || Cookies.get("schoolId");
      const finalClassId = classId || Cookies.get("classId");
      const finalTempNo = tempNo || Cookies.get("tempNo");

      if (!finalApplicationId) {
        throw new Error("Application ID is missing");
      }

      if (!finalClassId) {
        throw new Error("Class ID is missing");
      }

      if (!finalSchoolId) {
        throw new Error("School ID is missing");
      }

      const payload = {
        studentApplicationFormId: finalApplicationId,
        schoolId: finalSchoolId,
        classId: finalClassId,
        parentId: userId,
        paymentMethod: data.paymentMethod || "cash",
        paymentAmount: data.paymentAmount || 500,
        transactionId: data.transactionId || null,
        paymentMethodMeta: null,
        tempNo: finalTempNo, // Include temp number if available
      };

      const token = Cookies.get("authToken");
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await axios.post(`${BASE_URL}/pay/cash`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;

      if (
        response.status === 200 &&
        responseData.success &&
        responseData.payment?._id
      ) {
        const { _id, transactionId: responseTransactionId } =
          responseData.payment;

        // For backward compatibility, still set cookies
        if (responseTransactionId)
          Cookies.set("transactionId", responseTransactionId, { expires: 7 });
        if (finalTempNo) Cookies.set("tempNo", finalTempNo, { expires: 7 });
        if (finalApplicationId)
          Cookies.set("applicationId", finalApplicationId, { expires: 7 });
        if (finalClassId) Cookies.set("classId", finalClassId, { expires: 7 });
        if (finalSchoolId)
          Cookies.set("schoolId", finalSchoolId, { expires: 7 });

        // Store payment ID in localStorage
        localStorage.setItem("paymentId", _id);

        toast({
          description:
            responseData.message || "Payment submitted successfully!",
          variant: "success",
        });

        onNext(); // Move to Additional step
      } else {
        throw new Error(responseData.message || "Payment failed");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit payment";
      toast({
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

        {/* Display application information
        {applicationId && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="font-medium">Application ID: {applicationId}</p>
            {tempNo && (
              <p className="font-medium">Temporary Number: {tempNo}</p>
            )}
          </div>
        )} */}

        <form onSubmit={handleSubmit(onSubmitPayment)} className="space-y-4">
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              onValueChange={(value) => setValue("paymentMethod", value)}
              defaultValue="cash"
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                {/* <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="online">Online Transfer</SelectItem> */}
              </SelectContent>
            </Select>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">
                {errors.paymentMethod.message}
              </p>
            )}
            <input
              type="hidden"
              {...register("paymentMethod", {
                required: "Payment method is required",
              })}
            />
          </div>

          <div>
            <Label htmlFor="paymentAmount">Payment Amount ($)</Label>
            <Input
              id="paymentAmount"
              type="number"
              defaultValue={500}
              {...register("paymentAmount", {
                required: "Payment amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
                valueAsNumber: true,
              })}
            />
            {errors.paymentAmount && (
              <p className="text-red-500 text-sm">
                {errors.paymentAmount.message}
              </p>
            )}
          </div>

          {paymentMethod === "online" && (
            <div>
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                type="text"
                {...register("transactionId", {
                  required:
                    paymentMethod === "online"
                      ? "Transaction ID is required"
                      : false,
                })}
              />
              {errors.transactionId && (
                <p className="text-red-500 text-sm">
                  {errors.transactionId.message}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              className="bg-[#789336]"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Continue to Additional Details"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
