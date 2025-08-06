import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'align'
  ];

  const handleChange = (value: string) => {
    // Convert HTML to plain text for our structured parser
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    onChange(plainText);
  };

  // Convert plain text to HTML for display in editor
  const formatContentForEditor = (plainText: string) => {
    return plainText
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '<br>';
        
        // Section headers (all caps)
        if (trimmed === trimmed.toUpperCase() && trimmed.length > 2 && !trimmed.includes('•')) {
          return `<h2>${trimmed}</h2>`;
        }
        
        // Bullet points
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
          return `<li>${trimmed.substring(1).trim()}</li>`;
        }
        
        // Regular text
        return `<p>${trimmed}</p>`;
      })
      .join('');
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Use this rich text editor to format your resume with professional styling. 
        Changes will be automatically converted to structured format.
      </div>
      
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={formatContentForEditor(content)}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={{
            height: '450px',
            backgroundColor: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))'
          }}
          placeholder="Start editing your resume content..."
        />
      </div>
      
      <style>{`
        .ql-toolbar {
          border-top: 1px solid hsl(var(--border)) !important;
          border-left: 1px solid hsl(var(--border)) !important;
          border-right: 1px solid hsl(var(--border)) !important;
          background: hsl(var(--muted)) !important;
        }
        
        .ql-container {
          border-bottom: 1px solid hsl(var(--border)) !important;
          border-left: 1px solid hsl(var(--border)) !important;
          border-right: 1px solid hsl(var(--border)) !important;
          background: hsl(var(--background)) !important;
          color: hsl(var(--foreground)) !important;
        }
        
        .ql-editor {
          color: hsl(var(--foreground)) !important;
          font-family: inherit;
          line-height: 1.6;
        }
        
        .ql-editor h2 {
          color: hsl(var(--foreground)) !important;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem 0;
          border-bottom: 1px solid hsl(var(--border));
          padding-bottom: 0.25rem;
        }
        
        .ql-editor p {
          margin: 0.5rem 0;
        }
        
        .ql-editor li {
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
};