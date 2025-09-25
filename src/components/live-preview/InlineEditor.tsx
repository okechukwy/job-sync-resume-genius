import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InlineEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const InlineEditor = ({
  value,
  onChange,
  placeholder = "Click to edit...",
  className = "",
  style,
  multiline = false,
  fontSize = "14px",
  fontWeight = "normal",
  textAlign = "left",
  disabled = false,
  onFocus,
  onBlur,
}: InlineEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClick = () => {
    if (disabled) return;
    setIsEditing(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(localValue);
    onBlur?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      elementRef.current?.blur();
    } else if (e.key === 'Escape') {
      setLocalValue(value); // Reset to original value
      elementRef.current?.blur();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.textContent || '';
    setLocalValue(newValue);
  };

  const displayValue = localValue || placeholder;
  const isEmpty = !localValue;

  return (
    <div
      ref={elementRef}
      contentEditable={!disabled}
      suppressContentEditableWarning={true}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      className={cn(
        "relative min-h-[1.2em] outline-none transition-all duration-200",
        "hover:bg-blue-50/50 focus:bg-blue-50 focus:ring-2 focus:ring-blue-200 rounded px-1 -mx-1",
        isEditing && "bg-blue-50 ring-2 ring-blue-200",
        isEmpty && "text-gray-400 italic",
        disabled && "cursor-not-allowed opacity-60",
        !disabled && "cursor-text",
        className
      )}
      style={{
        fontSize,
        fontWeight,
        textAlign,
        minWidth: '20px',
        wordBreak: 'break-word',
        ...style
      }}
      data-placeholder={isEmpty ? placeholder : ''}
    >
      {!isEmpty && displayValue}
      {isEmpty && isEditing && (
        <span className="text-gray-400 italic">{placeholder}</span>
      )}
      {isEmpty && !isEditing && (
        <span className="text-gray-400 italic">{placeholder}</span>
      )}
    </div>
  );
};