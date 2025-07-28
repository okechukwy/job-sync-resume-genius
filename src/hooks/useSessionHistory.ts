
import { useState, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface FilterOptions {
  dateRange: string;
  sessionType: string;
  completionStatus: string;
  search: string;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface SortOptions {
  field: 'created_at' | 'scores' | 'session_type' | 'completed';
  order: 'asc' | 'desc';
}

export const useSessionHistory = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());

  // Filter and pagination state
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    sessionType: 'all',
    completionStatus: 'all',
    search: ''
  });

  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    pageSize: 10
  });

  const [sort, setSort] = useState<SortOptions>({
    field: 'created_at',
    order: 'desc'
  });

  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  const getDateFilter = useCallback((dateRange: string) => {
    const now = new Date();
    switch (dateRange) {
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      case '90d':
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
      case '180d':
        return new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000).toISOString();
      case '1y':
        return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
      default:
        return null;
    }
  }, []);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        console.log('No authenticated user found');
        setSessions([]);
        setTotalCount(0);
        return;
      }

      let query = supabase
        .from('interview_sessions')
        .select('*', { count: 'exact' })
        .eq('user_id', userData.user.id);

      // Apply filters
      if (filters.dateRange !== 'all') {
        const dateFilter = getDateFilter(filters.dateRange);
        if (dateFilter) {
          query = query.gte('created_at', dateFilter);
        }
      }

      if (filters.sessionType !== 'all') {
        query = query.eq('session_type', filters.sessionType);
      }

      if (filters.completionStatus !== 'all') {
        const isCompleted = filters.completionStatus === 'completed';
        query = query.eq('completed', isCompleted);
      }

      if (filters.search) {
        query = query.or(`session_type.ilike.%${filters.search}%,role_focus.ilike.%${filters.search}%`);
      }

      // Apply sorting
      const orderColumn = sort.field === 'scores' ? 'scores->overall' : sort.field;
      query = query.order(orderColumn, { ascending: sort.order === 'desc' });

      // Apply pagination
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching session history:', error);
        throw error;
      }

      // Filter out invalid sessions
      const validSessions = (data || []).filter(session => {
        if (!session.completed) return true;
        return session.responses && Array.isArray(session.responses) && session.responses.length > 0;
      });

      setSessions(validSessions);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching session history:', error);
      toast({
        title: "Failed to Load History",
        description: "Could not load your session history. Please check your connection and try again.",
        variant: "destructive",
      });
      setSessions([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination, sort, getDateFilter, toast]);

  const deleteSession = useCallback(async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('interview_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;

      toast({
        title: "Session Deleted",
        description: "The session has been permanently deleted.",
      });

      // Refresh the list
      fetchSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
      toast({
        title: "Delete Failed",
        description: "Could not delete the session. Please try again.",
        variant: "destructive",
      });
    }
  }, [fetchSessions, toast]);

  const toggleSessionExpanded = useCallback((sessionId: string) => {
    setExpandedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      dateRange: 'all',
      sessionType: 'all',
      completionStatus: 'all',
      search: ''
    });
    setPagination({ page: 1, pageSize: 10 });
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.dateRange !== 'all') count++;
    if (filters.sessionType !== 'all') count++;
    if (filters.completionStatus !== 'all') count++;
    if (filters.search.trim()) count++;
    return count;
  }, [filters]);

  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  return {
    sessions,
    loading,
    totalCount,
    totalPages,
    filters,
    pagination,
    sort,
    viewMode,
    expandedSessions,
    activeFiltersCount,
    setFilters,
    setPagination,
    setSort,
    setViewMode,
    fetchSessions,
    deleteSession,
    toggleSessionExpanded,
    clearFilters
  };
};
