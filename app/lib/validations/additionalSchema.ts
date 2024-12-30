import {z} from "zod";

export const additionalFormSchema = z.object({});

export type AdditionalFormValues = z.infer<typeof additionalFormSchema>;