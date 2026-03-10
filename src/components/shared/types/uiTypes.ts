/**
 * UI-specific types for AI components
 */

/**
 * Props for message rendering components
 */
export interface MessageRendererProps {
  /** The message content to render */
  content: string;
  /** Whether the message is from the user or the assistant */
  role: 'user' | 'assistant';
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Props for message list components
 */
export interface MessageListProps {
  /** Array of messages to display */
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
  }>;
  /** Whether to show the typing indicator */
  isTyping?: boolean;
  /** Reference to the message list container */
  messageListRef?: React.RefObject<HTMLDivElement>;
}

/**
 * Props for selectable options components
 */
export interface SelectableOptionsProps {
  /** Array of options to display */
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  /** Callback when an option is selected */
  onSelect: (option: { id: string; label: string; value: string }) => void;
  /** Whether the options are disabled */
  disabled?: boolean;
} 