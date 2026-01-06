import React from 'react';
import { ChatMessageVM } from '../../types/types';

interface MessageListProps {
  messages: ChatMessageVM[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  console.log('MessageList received messages:', messages);
  
  const formatTime = (timestamp: string) => {
    console.log('formatTime called with:', timestamp);
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      console.log('Invalid date from timestamp:', timestamp);
      return '--:--';
    }
    
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const getMessageStyle = (messageType: string, senderName: string) => {
    if (messageType === 'system') {
      return {
        backgroundColor: '#fff3cd',
        borderLeft: '4px solid #ffc107',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        borderRadius: '4px'
      };
    }
    
    if (senderName === 'User') {
      return {
        backgroundColor: '#d1ecf1',
        borderLeft: '4px solid #0dcaf0',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        borderRadius: '4px',
        marginLeft: '2rem'
      };
    }
    
    return {
      backgroundColor: '#d4edda',
      borderLeft: '4px solid #198754',
      padding: '0.5rem',
      marginBottom: '0.5rem',
      borderRadius: '4px',
      marginRight: '2rem'
    };
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} style={getMessageStyle(message.messageType, message.senderName)}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{message.senderName}</strong>
            <small>{formatTime(message.timestamp)}</small>
          </div>
          <div>{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;