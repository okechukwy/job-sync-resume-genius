
import { Improvement } from "../types/analysisTypes";
import { ImprovementValidationResult } from "../services/improvementValidation";

export interface OptimizationCompleteness {
  totalImprovements: number;
  completedCount: number;
  aiAddressedCount: number;
  manuallyCompletedCount: number;
  partiallyAddressedCount: number;
  isFullyOptimized: boolean;
  completionPercentage: number;
}

export const calculateOptimizationCompleteness = (
  improvements: Improvement[],
  manuallyCompletedItems: number[],
  improvementValidation: ImprovementValidationResult | null
): OptimizationCompleteness => {
  const totalImprovements = improvements.length;
  const aiAddressedCount = improvementValidation?.addressed.length || 0;
  const partiallyAddressedCount = improvementValidation?.partiallyAddressed.length || 0;
  const manuallyCompletedCount = manuallyCompletedItems.length;
  
  // Calculate total completed (AI fully addressed + manually completed)
  // Note: Partially addressed items are NOT considered fully complete
  const completedCount = aiAddressedCount + manuallyCompletedCount;
  
  const isFullyOptimized = completedCount === totalImprovements;
  const completionPercentage = totalImprovements > 0 ? Math.round((completedCount / totalImprovements) * 100) : 100;

  return {
    totalImprovements,
    completedCount,
    aiAddressedCount,
    manuallyCompletedCount,
    partiallyAddressedCount,
    isFullyOptimized,
    completionPercentage
  };
};
