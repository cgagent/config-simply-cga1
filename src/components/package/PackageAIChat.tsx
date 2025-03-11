
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PackageSummary } from './PackageSummary';
import { Package } from '@/types/package';
import { formatNumber, formatBytes } from '@/lib/formatters';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

interface PackageAIChatProps {
  packages: Package[];
}

const PackageAIChat: React.FC<PackageAIChatProps> = ({ packages }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Hi! I\'m your package management assistant. How can I help you today? You can ask me about your packages, such as "Show me the latest 10 downloaded packages" or "Show me packages with vulnerabilities".'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Calculate summary metrics
  const totalPackages = packages.length;
  const totalConsumption = packages.reduce((acc, pkg) => acc + pkg.downloads, 0);
  const totalStorage = packages.reduce((acc, pkg) => acc + pkg.size, 0);
  const maliciousPackages = packages.filter(pkg => pkg.vulnerabilities > 2).length;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let response = '';
      const query = input.toLowerCase();
      
      // Process different query types
      if (query.includes('latest') && query.includes('download')) {
        // Show latest downloaded packages
        const sortedPackages = [...packages]
          .sort((a, b) => b.downloads - a.downloads)
          .slice(0, 10);
        
        response = `Here are the 10 most downloaded packages:\n\n`;
        sortedPackages.forEach((pkg, index) => {
          response += `${index + 1}. **${pkg.name}** (${pkg.type}) - ${formatNumber(pkg.downloads)} downloads\n`;
        });
      } 
      else if (query.includes('vulnerabilit')) {
        // Show packages with vulnerabilities
        const vulnerablePackages = packages.filter(pkg => pkg.vulnerabilities > 0)
          .sort((a, b) => b.vulnerabilities - a.vulnerabilities);
        
        if (vulnerablePackages.length === 0) {
          response = 'Great news! I couldn\'t find any packages with vulnerabilities.';
        } else {
          response = `I found ${vulnerablePackages.length} packages with vulnerabilities:\n\n`;
          vulnerablePackages.forEach((pkg, index) => {
            const severity = pkg.vulnerabilities > 2 ? 'High' : 'Low';
            response += `${index + 1}. **${pkg.name}** (${pkg.type}) - ${pkg.vulnerabilities} vulnerabilities (${severity} severity)\n`;
          });
        }
      }
      else if (query.includes('blocked')) {
        // Show blocked packages (in this demo, we consider packages with high vulnerabilities as blocked)
        const blockedPackages = packages.filter(pkg => pkg.vulnerabilities > 2);
        
        if (blockedPackages.length === 0) {
          response = 'There are currently no blocked packages.';
        } else {
          response = `I found ${blockedPackages.length} blocked packages due to high security risks:\n\n`;
          blockedPackages.forEach((pkg, index) => {
            response += `${index + 1}. **${pkg.name}** (${pkg.type}) - Blocked due to ${pkg.vulnerabilities} critical vulnerabilities\n`;
          });
        }
      }
      else if (query.includes('size') || query.includes('storage')) {
        // Show largest packages by size
        const sortedBySize = [...packages]
          .sort((a, b) => b.size - a.size)
          .slice(0, 5);
        
        response = `Here are the 5 largest packages by size:\n\n`;
        sortedBySize.forEach((pkg, index) => {
          response += `${index + 1}. **${pkg.name}** (${pkg.type}) - ${formatBytes(pkg.size)}\n`;
        });
      }
      else if (query.includes('summary') || query.includes('overview')) {
        // Show package summary
        response = `Here's a summary of your package statistics:\n\n`;
        response += `• Total Packages: ${totalPackages}\n`;
        response += `• Total Downloads: ${formatNumber(totalConsumption)}\n`;
        response += `• Total Storage: ${formatBytes(totalStorage)}\n`;
        response += `• Malicious Packages: ${maliciousPackages}\n`;
      }
      else {
        // Generic response for unrecognized queries
        response = `I'm not sure I understand your query about "${input}". Here are some things you can ask me:\n\n`;
        response += `• Show me the latest 10 downloaded packages\n`;
        response += `• Show me existing packages with vulnerabilities\n`;
        response += `• Show me the packages that are blocked\n`;
        response += `• Show me the largest packages by size\n`;
        response += `• Give me a summary of my packages\n`;
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Text copied successfully",
      });
    });
  };

  const suggestedQueries = [
    "Show me the latest 10 downloaded packages",
    "Show me existing packages with vulnerabilities",
    "Show me the packages that are blocked",
    "Show me the largest packages by size",
    "Give me a summary of my packages"
  ];

  return (
    <div className="flex flex-col h-[700px] border rounded-lg overflow-hidden bg-background">
      <div className="bg-primary p-3">
        <h3 className="text-white font-medium flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          Package Management Assistant
        </h3>
      </div>
      
      {/* Summary Cards at the top */}
      <div className="p-4 bg-muted/30">
        <PackageSummary 
          totalPackages={totalPackages} 
          totalConsumption={totalConsumption} 
          totalStorage={totalStorage} 
          maliciousPackages={maliciousPackages} 
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground ml-12' 
                  : 'bg-muted mr-12'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.role === 'bot' ? (
                  <Bot className="w-4 h-4 mr-2" />
                ) : (
                  <User className="w-4 h-4 mr-2" />
                )}
                <span className="text-xs font-medium">
                  {message.role === 'bot' ? 'Assistant' : 'You'}
                </span>
                {message.role === 'bot' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 h-6 w-6 p-0"
                    onClick={() => copyToClipboard(message.content)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              <div className="whitespace-pre-wrap">
                {message.content.split('\n').map((line, i) => {
                  if (line.startsWith('• ')) {
                    return <p key={i} className="mb-1 ml-2">• {line.substring(2)}</p>;
                  } else if (line.match(/^\d+\./)) {
                    return <p key={i} className="mb-1 ml-2">{line}</p>;
                  } else if (line.includes('**')) {
                    return (
                      <p key={i} className="mb-1">
                        {line.split('**').map((segment, j) => 
                          j % 2 === 1 ? <strong key={j}>{segment}</strong> : segment
                        )}
                      </p>
                    );
                  } else {
                    return <p key={i} className="mb-1">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested queries */}
      {messages.length < 3 && (
        <div className="px-4 py-2 bg-muted/20">
          <p className="text-xs text-muted-foreground mb-2">Suggested queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setInput(query);
                }}
              >
                {query}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-3 border-t bg-background">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your packages..."
            disabled={isProcessing}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isProcessing}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageAIChat;
