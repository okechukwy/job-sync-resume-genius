import { useEffect, useRef, useState } from "react";
import { ResumeData } from "@/hooks/useResumeSteps";
import { toast } from "sonner";

interface RealTimeSyncProps {
  data: ResumeData;
  onDataUpdate: (section: keyof ResumeData, data: any) => void;
  children: React.ReactNode;
}

export const RealTimeSync = ({
  data,
  onDataUpdate,
  children,
}: RealTimeSyncProps) => {
  const [unsavedChanges, setUnsavedChanges] = useState<Set<keyof ResumeData>>(new Set());
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const undoStackRef = useRef<ResumeData[]>([]);
  const redoStackRef = useRef<ResumeData[]>([]);
  const maxHistorySize = 50;

  // Add current state to undo stack
  useEffect(() => {
    if (undoStackRef.current.length === 0 || 
        JSON.stringify(undoStackRef.current[undoStackRef.current.length - 1]) !== JSON.stringify(data)) {
      undoStackRef.current.push(JSON.parse(JSON.stringify(data)));
      
      // Limit history size
      if (undoStackRef.current.length > maxHistorySize) {
        undoStackRef.current.shift();
      }
      
      // Clear redo stack when new changes are made
      redoStackRef.current = [];
    }
  }, [data]);

  const handleFieldUpdate = (section: keyof ResumeData, fieldPath: string, value: any) => {
    // Mark section as having unsaved changes
    setUnsavedChanges(prev => new Set(prev).add(section));
    
    // Clear existing save timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Create updated data
    const updatedData = { ...data };
    
    // Handle nested field updates
    if (fieldPath.includes('.')) {
      const keys = fieldPath.split('.');
      let current: any = updatedData[section];
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
    } else {
      (updatedData[section] as any) = value;
    }
    
    // Immediate optimistic update
    onDataUpdate(section, updatedData[section]);
    
    // Debounced save
    saveTimeoutRef.current = setTimeout(() => {
      setUnsavedChanges(prev => {
        const updated = new Set(prev);
        updated.delete(section);
        return updated;
      });
      setLastSaved(new Date());
      toast.success("Changes saved", { duration: 1000 });
    }, 1000);
  };

  const handleUndo = () => {
    if (undoStackRef.current.length > 1) {
      const current = undoStackRef.current.pop()!;
      redoStackRef.current.push(current);
      
      const previous = undoStackRef.current[undoStackRef.current.length - 1];
      
      // Update all sections with previous data
      Object.keys(previous).forEach(section => {
        onDataUpdate(section as keyof ResumeData, previous[section as keyof ResumeData]);
      });
      
      toast.success("Undone", { duration: 1000 });
    }
  };

  const handleRedo = () => {
    if (redoStackRef.current.length > 0) {
      const next = redoStackRef.current.pop()!;
      undoStackRef.current.push(next);
      
      // Update all sections with next data
      Object.keys(next).forEach(section => {
        onDataUpdate(section as keyof ResumeData, next[section as keyof ResumeData]);
      });
      
      toast.success("Redone", { duration: 1000 });
    }
  };

  const handleSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Force save all pending changes
    setUnsavedChanges(new Set());
    setLastSaved(new Date());
    toast.success("All changes saved");
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Provide sync functions to children
  const syncFunctions = {
    updateField: handleFieldUpdate,
    undo: handleUndo,
    redo: handleRedo,
    save: handleSave,
    hasUnsavedChanges: unsavedChanges.size > 0,
    canUndo: undoStackRef.current.length > 1,
    canRedo: redoStackRef.current.length > 0,
    lastSaved,
  };

  return (
    <div data-sync-functions={JSON.stringify(syncFunctions)}>
      {children}
    </div>
  );
};