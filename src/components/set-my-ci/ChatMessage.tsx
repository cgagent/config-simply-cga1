
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  type: 'system' | 'button-group';
  content: string | React.ReactNode;
  isUser?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ type, content, isUser = false }) => {
  if (type === 'button-group') {
    return <div className="py-2">{content}</div>;
  }

  return (
    <div className={`flex items-start space-x-3 animate-fadeIn ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 p-2 rounded-full ${isUser ? 'bg-blue-600' : 'bg-blue-100'}`}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Bot className="h-5 w-5 text-blue-600" />
        )}
      </div>
      <div className={`flex-1 rounded-lg px-4 py-3 border ${
        isUser 
          ? 'bg-blue-600 text-white border-blue-500' 
          : 'bg-gray-50 text-gray-800 border-gray-200'
      }`}>
        <div className="whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
};
