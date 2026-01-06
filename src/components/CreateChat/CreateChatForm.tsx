import React, { useState, useEffect } from 'react';
import { getAgents, createChat } from '../../services/api';

interface CreateChatFormProps {
  onCreateChat: (chatId: string) => void;
}

const CreateChatForm: React.FC<CreateChatFormProps> = ({ onCreateChat }) => {
  const [agents, setAgents] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const agentsList = await getAgents();
      setAgents(agentsList);
    } catch (err) {
      setError('Ошибка загрузки агентов');
      console.error(err);
    }
  };

  const handleAgentToggle = (agentName: string) => {
    setSelectedAgents(prev => {
      if (prev.includes(agentName)) {
        return prev.filter(name => name !== agentName);
      } else {
        return [...prev, agentName];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedAgents.length === 0) {
      setError('Выберите хотя бы одного агента');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const chatId = await createChat(selectedAgents);
      onCreateChat(chatId);
    } catch (err: any) {
      setError('Ошибка создания чата: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Создать новый чат</h2>
      
      {error && (
        <div style={{
          padding: '0.75rem',
          marginBottom: '1rem',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <h4>Выберите агентов:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {agents.map((agent, index) => (
              <label key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                backgroundColor: selectedAgents.includes(agent) ? '#61dafb' : '#f5f5f5',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(agent)}
                  onChange={() => handleAgentToggle(agent)}
                  style={{ marginRight: '0.5rem' }}
                />
                {agent}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <strong>Выбрано: </strong>
          {selectedAgents.length > 0 
            ? selectedAgents.join(', ')
            : 'нет агентов'}
        </div>

        <button
          type="submit"
          disabled={loading || selectedAgents.length === 0}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#198754',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading || selectedAgents.length === 0 ? 0.5 : 1
          }}
        >
          {loading ? 'Создание...' : 'Создать чат'}
        </button>
      </form>
    </div>
  );
};

export default CreateChatForm;