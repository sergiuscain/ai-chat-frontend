import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { getChatHistory, sendMessage, setupSSE } from '../../services/api';
import { ChatMessageVM } from '../../types/types';

interface ChatWindowProps {
  chatId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<ChatMessageVM[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const sseRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!chatId) return;

    loadChatHistory();
    setupEventSource();

    return () => {
      if (sseRef.current) {
        sseRef.current.close();
      }
    };
  }, [chatId]);
  useEffect(() => {
  console.log('Messages updated:', messages);
  messages.forEach((msg, index) => {
    console.log(`Message ${index}:`, {
      content: msg.content,
      timestamp: msg.timestamp,
      hasTimestamp: !!msg.timestamp,
      id: msg.id
    });
  });
}, [messages]);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const history = await getChatHistory(chatId);
      setMessages(history);
    } catch (err) {
      console.error('Ошибка загрузки истории:', err);
    } finally {
      setLoading(false);
    }
  };

  const setupEventSource = () => {
  const eventSource = setupSSE(chatId, (message: ChatMessageVM) => {
    // Проверяем что это валидное сообщение
    console.log('SSE callback received message:', message);
    
    if (!message.content || !message.senderName) {
      console.log('Invalid message received:', message);
      return;
    }
    
    if (message.messageType === 'system' && message.content.includes('connected')) {
      console.log('System connection message, ignoring');
      return;
    }
    
    // Проверяем timestamp
    console.log('Message timestamp:', message.timestamp, 'Type:', typeof message.timestamp);
    
    setMessages(prev => [...prev, message]);
  });

  sseRef.current = eventSource;
};

  const handleSendMessage = async (senderName: string, content: string) => {
    try {
      await sendMessage(chatId, senderName, content);
    } catch (err) {
      console.error('Ошибка отправки сообщения:', err);
      alert('Ошибка отправки сообщения');
    }
  };

  if (!chatId) {
    return <div>Выберите или создайте чат</div>;
  }

  if (loading) {
    return <div>Загрузка чата...</div>;
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%' 
    }}>
      <div style={{
        padding: '0.5rem',
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #ddd',
        marginBottom: '1rem'
      }}>
        <h3>Чат ID: {chatId}</h3>
        <button
          onClick={loadChatHistory}
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Обновить
        </button>
      </div>
      
      <div style={{ flex: 1, overflow: 'auto', marginBottom: '1rem' }}>
        <MessageList messages={messages} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;