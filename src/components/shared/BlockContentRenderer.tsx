import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import DOMPurify from 'dompurify';

interface RichTextRendererProps {
  content: string;
  className?: string;
  skipSanitize?: boolean;
}

export default function RichTextRenderer({ 
  content, 
  className = '', 
  skipSanitize = false 
}: RichTextRendererProps) {
  
  useEffect(() => {
    // Initialize highlight.js for code blocks
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [content]);

  // Sanitize HTML to prevent XSS
  const sanitizeHTML = (html: string) => {
    if (skipSanitize) return html;
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'span', 'div', 'strong', 'em',
        'blockquote', 'code', 'pre', 'ul', 'ol', 'li',
        'a', 'img', 'iframe', 'table', 'thead', 'tbody',
        'tr', 'th', 'td'
      ],
      ALLOWED_ATTR: [
        'href', 'src', 'alt', 'title', 'class',
        'width', 'height', 'frameborder', 'allowfullscreen'
      ],
    });
  };

  return (
    <div 
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
    />
  );
}

// Add CSS for rich text styling
export const richTextStyles = `
  .rich-text-content {
    line-height: 1.8;
    color: #374151;
  }
  
  .rich-text-content h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 2rem 0 1rem;
    color: #111827;
  }
  
  .rich-text-content h2 {
    font-size: 2rem;
    font-weight: bold;
    margin: 1.5rem 0 1rem;
    color: #1f2937;
  }
  
  .rich-text-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.25rem 0 0.75rem;
  }
  
  .rich-text-content p {
    margin: 1rem 0;
  }
  
  .rich-text-content blockquote {
    border-left: 4px solid #10b981;
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: #4b5563;
  }
  
  .rich-text-content pre {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  .rich-text-content code {
    background: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: 'Fira Code', monospace;
    font-size: 0.875rem;
  }
  
  .rich-text-content img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }
  
  .rich-text-content ul, 
  .rich-text-content ol {
    margin: 1rem 0 1rem 1.5rem;
  }
  
  .rich-text-content a {
    color: #10b981;
    text-decoration: underline;
  }
  
  .rich-text-content a:hover {
    color: #059669;
  }
  
  .rich-text-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  
  .rich-text-content th,
  .rich-text-content td {
    padding: 0.75rem;
    border: 1px solid #e5e7eb;
  }
  
  .rich-text-content th {
    background: #f9fafb;
    font-weight: 600;
  }
`;