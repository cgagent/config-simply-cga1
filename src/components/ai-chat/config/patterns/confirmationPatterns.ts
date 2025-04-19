/**
 * Patterns for confirmation messages
 */
export const CONFIRMATION_PATTERNS = [
  'yes', 'proceed', 'continue', 'confirm', 'ok', 'sure', 
  'go ahead', 'let\'s do it', 'do it', 'start', 'begin'
] as const;

/**
 * Check if a message is a confirmation message
 * @param content The message content to check
 * @returns True if the message is a confirmation message
 */
export const isConfirmationMessage = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  return CONFIRMATION_PATTERNS.some(word => lowerContent.includes(word));
}; 