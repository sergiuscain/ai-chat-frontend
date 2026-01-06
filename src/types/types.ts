export interface ChatMessageVM {
  id: string;
  chatId: string;
  senderName: string;
  content: string;
  timestamp: string;  // Измените с Date на string
  messageType: 'text' | 'system' | 'agent_response';
}

export interface CreateChatRequest {
  agentNames: string[];
}

export interface SendMessageRequest {
  chatId: string;
  senderName: string;
  message: string;
}

export interface CreateChatResponse {
  chatId: string;
}

export type AppView = 'agents' | 'createChat' | 'chat';