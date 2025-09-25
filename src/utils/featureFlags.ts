import React from 'react';

/**
 * Feature flag utility for controlling feature availability
 * Environment-based feature flags allow conditional rendering based on deployment environment
 */

export interface FeatureFlags {
  enableWhiteLabel: boolean;
  enableAdvancedAnalytics: boolean;
  enableBetaFeatures: boolean;
}

/**
 * Get feature flag values from environment variables
 * Defaults to false for production safety
 */
export const getFeatureFlags = (): FeatureFlags => {
  return {
    enableWhiteLabel: import.meta.env.VITE_ENABLE_WHITE_LABEL === 'true',
    enableAdvancedAnalytics: import.meta.env.VITE_ENABLE_ADVANCED_ANALYTICS === 'true',
    enableBetaFeatures: import.meta.env.VITE_ENABLE_BETA_FEATURES === 'true',
  };
};

/**
 * Check if a specific feature is enabled
 */
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  const flags = getFeatureFlags();
  return flags[feature];
};

/**
 * Hook for using feature flags in React components
 */
export const useFeatureFlags = (): FeatureFlags => {
  return getFeatureFlags();
};

/**
 * Component wrapper for feature-gated content
 */
interface FeatureGateProps {
  feature: keyof FeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  children, 
  fallback = null 
}) => {
  const isEnabled = isFeatureEnabled(feature);
  return isEnabled ? children : fallback;
};