import { ChatMessageVM, CreateChatRequest, CreateChatResponse, SendMessageRequest } from '../types/types';

const API_BASE_URL = 'https://localhost:7015/api/Ai';

export const getAgents = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/GetAllAgentsName`);
  if (!response.ok) throw new Error('Ошибка получения агентов');
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};

export const createChat = async (agentNames: string[]): Promise<string> => {
  const request: CreateChatRequest = { agentNames };
  
  const response = await fetch(`${API_BASE_URL}/CreateChat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка создания чата: ${response.status} ${errorText}`);
  }
  
  const data: CreateChatResponse = await response.json();
  return data.chatId;
};

export const sendMessage = async (chatId: string, senderName: string, message: string): Promise<void> => {
  const request: SendMessageRequest = {
    chatId,
    senderName,
    message,
  };
  
  const response = await fetch(`${API_BASE_URL}/Send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка отправки сообщения: ${response.status} ${errorText}`);
  }
};

export const getChatHistory = async (chatId: string): Promise<ChatMessageVM[]> => {
  const response = await fetch(`${API_BASE_URL}/GetChatHistory?chatId=${encodeURIComponent(chatId)}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка получения истории: ${response.status} ${errorText}`);
  }
  
  // Типизируем ответ как ChatMessageVM[] - timestamp будет string
  const messages: ChatMessageVM[] = await response.json();
  return messages;
};

export const setupSSE = (chatId: string, onMessage: (message: ChatMessageVM) => void): EventSource => {
  const eventSource = new EventSource(`${API_BASE_URL}/stream/${chatId}`);

  eventSource.onmessage = (event: MessageEvent) => {
    console.log('SSE raw data:', event.data);
    
    try {
      const data: ChatMessageVM = JSON.parse(event.data);
      console.log('SSE parsed data:', data);
      
      onMessage(data);
    } catch (err) {
      console.error('Ошибка парсинга SSE сообщения:', err);
    }
  };

  eventSource.onerror = (error: Event) => {
    console.error('SSE ошибка:', error);
  };

  return eventSource;
};