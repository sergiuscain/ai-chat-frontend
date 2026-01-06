import React, { useState, useEffect } from 'react';
import { getAgents, deleteAgent } from '../../services/api';

const AgentsList: React.FC = () => {
  const [agents, setAgents] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingAgent, setDeletingAgent] = useState<string | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      const agentsList = await getAgents();
      setAgents(agentsList);
    } catch (err) {
      setError('Ошибка загрузки агентов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAgent = async (agentName: string) => {
    if (!window.confirm(`Удалить агента "${agentName}"?`)) {
      return;
    }

    try {
      setDeletingAgent(agentName);
      const result = await deleteAgent(agentName);
      
      if (result.success) {
        // Обновляем список после удаления
        await loadAgents();
      } else {
        alert(result.message || 'Не удалось удалить агента');
      }
    } catch (err: any) {
      alert(`Ошибка удаления агента: ${err.message}`);
    } finally {
      setDeletingAgent(null);
    }
  };

  if (loading) return <div>Загрузка агентов...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Список агентов</h2>
        <button 
          onClick={loadAgents}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Обновить список
        </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {agents.map((agent, index) => (
          <li key={index} style={{
            padding: '0.75rem',
            marginBottom: '0.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            borderLeft: '4px solid #61dafb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.1rem' }}>{agent}</span>
            <button
              onClick={() => handleDeleteAgent(agent)}
              disabled={deletingAgent === agent}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: deletingAgent === agent ? 'not-allowed' : 'pointer',
                opacity: deletingAgent === agent ? 0.5 : 1
              }}
            >
              {deletingAgent === agent ? 'Удаление...' : 'Удалить'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentsList;