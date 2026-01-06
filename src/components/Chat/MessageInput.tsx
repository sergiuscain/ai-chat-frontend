import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (senderName: string, message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [senderName, setSenderName] = useState<string>('User');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !senderName.trim()) return;
    
    onSendMessage(senderName, message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '0.5rem',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #dee2e6'
    }}>
      <input
        type="text"
        value={senderName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenderName(e.target.value)}
        placeholder="Ваше имя"
        style={{
          flex: '0 0 100px',
          padding: '0.5rem',
          border: '1px solid #ced4da',
          borderRadius: '4px'
        }}
      />
      <input
        type="text"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Введите сообщение..."
        style={{
          flex: 1,
          padding: '0.5rem',
          border: '1px solid #ced4da',
          borderRadius: '4px'
        }}
      />
      <button
        type="submit"
        disabled={!message.trim()}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: message.trim() ? 1 : 0.5
        }}
      >
        Отправить
      </button>
    </form>
  );
};

export default MessageInput;