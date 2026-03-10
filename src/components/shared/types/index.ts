/**
 * Shared Types for AI Components
 * 
 * This directory contains all shared types used across AI-related components.
 * Types are organized by domain:
 * - messageTypes.ts: Types related to messages and their content
 * - chatTypes.ts: Types related to chat functionality
 * - uiTypes.ts: Types related to UI components
 */

// Basic message types
export interface Message {
  id: string;
  role: 'user' | 'bot' | 'assistant';
  content: string;
}

// Chat option type
export interface ChatOption {
  id: string;
  label: string;
  value: string;
}

// Re-export all other types
export * from './messageTypes';
export * from '../../ai-chat/types/chatTypes';
export * from './uiTypes'; 