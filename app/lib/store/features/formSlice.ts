import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormStep } from "@/app/(form)/registration/ui/FormNavbar";
import {
  registerFormSchema,
  RegisterFormValues,
} from "@/app/lib/validations/registerSchema";

// Create a new type for serialized form data
type SerializedFormData = Omit<RegisterFormValues, "dateOfBirth"> & {
  dateOfBirth?: string;
};

interface FormState {
  currentStep: FormStep;
  progress: number;
  formData: Partial<SerializedFormData>;
}

const initialState: FormState = {
  currentStep: "basic",
  progress: 0,
  formData: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<FormStep>) => {
      state.currentStep = action.payload;
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<SerializedFormData>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
      const totalFields = Object.keys(registerFormSchema.shape).length;
      const filledFields = Object.values(state.formData).filter(Boolean).length;
      state.progress = Math.round((filledFields / totalFields) * 100);
    },
    resetForm: () => initialState,
  },
});

export const { setStep, updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
