import { create } from 'zustand';

interface BiodataState {
  stepData: {
    [key: number]: any;
  };
  currentStep: number;
  completedSteps: number[];
  isLoading: boolean;
  setStepData: (step: number, data: any) => void;
  setCurrentStep: (step: number) => void;
  addCompletedStep: (step: number) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useBiodataStore = create<BiodataState>((set) => ({
  stepData: {},
  currentStep: 1,
  completedSteps: [],
  isLoading: false,
  setStepData: (step, data) => set((state) => ({
    stepData: { ...state.stepData, [step]: data }
  })),
  setCurrentStep: (step) => set({ currentStep: step }),
  addCompletedStep: (step) => set((state) => ({
    completedSteps: [...new Set([...state.completedSteps, step])]
  })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  reset: () => set({ stepData: {}, currentStep: 1, completedSteps: [], isLoading: false })
}));