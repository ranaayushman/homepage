import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormStep } from "@/app/(form)/registration/ui/FormNavbar";

interface FormState {
  currentStep: FormStep;
  progress: number;
  formData: {
    admissionClass?: string;
    schoolingMode?: string;
    admissionSession?: string;
  };
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
      action: PayloadAction<Partial<FormState["formData"]>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
      // Calculate progress based on filled fields
      const totalFields = 3;
      const filledFields = Object.values(state.formData).filter(Boolean).length;
      state.progress = Math.round((filledFields / totalFields) * 100);
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { setStep, updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
