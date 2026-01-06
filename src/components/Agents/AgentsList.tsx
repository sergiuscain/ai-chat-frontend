import React, { useState, useEffect } from 'react';
import { getAgents } from '../../services/api';

const AgentsList: React.FC = () => {
  const [agents, setAgents] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Загрузка агентов...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
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
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {agents.map((agent, index) => (
          <li key={index} style={{
            padding: '0.75rem',
            marginBottom: '0.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            borderLeft: '4px solid #61dafb'
          }}>
            {agent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentsList;