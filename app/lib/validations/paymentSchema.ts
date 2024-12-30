import { z } from "zod";
export const paymentFormSchema = z.object({});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
