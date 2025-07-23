import { useState, useEffect } from 'react';
import { whiteLabelService, WhiteLabelConfig, ExportJob, ExportHistory, WhiteLabelStats } from '@/services/whiteLabelService';

export const useWhiteLabelConfig = () => {
  const [configs, setConfigs] = useState<WhiteLabelConfig[]>([]);
  const [activeConfig, setActiveConfig] = useState<WhiteLabelConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const loadConfigs = async () => {
    setLoading(true);
    try {
      const [configsData, activeConfigData] = await Promise.all([
        whiteLabelService.getConfigs(),
        whiteLabelService.getActiveConfig(),
      ]);
      setConfigs(configsData);
      setActiveConfig(activeConfigData);
    } catch (error) {
      console.error('Error loading configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (config: Partial<WhiteLabelConfig>) => {
    const savedConfig = await whiteLabelService.saveConfig(config);
    if (savedConfig) {
      await loadConfigs();
      return savedConfig;
    }
    return null;
  };

  const setActive = async (configId: string) => {
    const success = await whiteLabelService.setActiveConfig(configId);
    if (success) {
      await loadConfigs();
    }
    return success;
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  return {
    configs,
    activeConfig,
    loading,
    saveConfig,
    setActive,
    refresh: loadConfigs,
  };
};

export const useExportJobs = () => {
  const [jobs, setJobs] = useState<ExportJob[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const jobsData = await whiteLabelService.getExportJobs();
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading export jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (job: Partial<ExportJob>) => {
    const newJob = await whiteLabelService.createExportJob(job);
    if (newJob) {
      await loadJobs();
      return newJob;
    }
    return null;
  };

  const updateJob = async (jobId: string, updates: Partial<ExportJob>) => {
    const success = await whiteLabelService.updateExportJob(jobId, updates);
    if (success) {
      await loadJobs();
    }
    return success;
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return {
    jobs,
    loading,
    createJob,
    updateJob,
    refresh: loadJobs,
  };
};

export const useExportHistory = () => {
  const [history, setHistory] = useState<ExportHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const historyData = await whiteLabelService.getExportHistory();
      setHistory(historyData);
    } catch (error) {
      console.error('Error loading export history:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToHistory = async (historyItem: Partial<ExportHistory>) => {
    const success = await whiteLabelService.addToHistory(historyItem);
    if (success) {
      await loadHistory();
    }
    return success;
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return {
    history,
    loading,
    addToHistory,
    refresh: loadHistory,
  };
};

export const useWhiteLabelStats = () => {
  const [stats, setStats] = useState<WhiteLabelStats>({
    total_exports: 0,
    active_clients: 0,
    success_rate: 0,
    pending_exports: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    try {
      const statsData = await whiteLabelService.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return {
    stats,
    loading,
    refresh: loadStats,
  };
};