import { useQuery } from '@tanstack/react-query';
import { PersonalBrandingAnalyticsService, BrandAnalyticsData } from '@/services/personalBrandingAnalytics';

export const usePersonalBrandingAnalytics = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['personal-branding-analytics', userId],
    queryFn: () => PersonalBrandingAnalyticsService.calculateBrandAnalytics(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  });
};