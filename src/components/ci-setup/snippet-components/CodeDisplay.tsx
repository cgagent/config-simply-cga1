
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeDisplayProps {
  content: string;
  filename?: string;
  showActions?: boolean;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ content, filename = 'snippet.yml', showActions = true }) => {
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Code snippet copied successfully",
      });
    });
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full rounded-md overflow-hidden">
      {showActions && (
        <div className="flex justify-end gap-1 mb-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-blue-300 hover:text-white hover:bg-blue-900/60"
            onClick={handleCopy}
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-blue-300 hover:text-white hover:bg-blue-900/60"
            onClick={handleDownload}
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Download
          </Button>
        </div>
      )}
      <pre className="bg-gray-900 text-blue-100 p-3 rounded overflow-x-auto text-sm border border-gray-700">
        {content}
      </pre>
    </div>
  );
};

export default CodeDisplay;
