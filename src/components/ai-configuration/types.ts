export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: React.ReactNode;
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
}
