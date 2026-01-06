import React, { useState } from 'react';
import { createAgent } from '../../services/api';

interface CreateAgentFormProps {
  onAgentCreated: () => void;
  onCancel?: () => void;
}

const CreateAgentForm: React.FC<CreateAgentFormProps> = ({ onAgentCreated, onCancel }) => {
  const [agentName, setAgentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agentName.trim()) {
      setError('Введите имя агента');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const result = await createAgent(agentName);
      
      if (result.success) {
        setSuccess(result.message || `Агент "${agentName}" создан успешно`);
        setAgentName('');
        onAgentCreated();
      } else {
        setError(result.message || 'Не удалось создать агента');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка создания агента');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Создать нового агента</h2>
      
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
      
      {success && (
        <div style={{
          padding: '0.75rem',
          marginBottom: '1rem',
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          borderRadius: '4px'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="agentName" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Имя агента:
          </label>
          <input
            id="agentName"
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Введите уникальное имя агента"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            disabled={loading}
            autoFocus
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={loading || !agentName.trim()}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#198754',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading || !agentName.trim() ? 'not-allowed' : 'pointer',
              opacity: loading || !agentName.trim() ? 0.5 : 1,
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Создание...' : 'Создать агента'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
                fontSize: '1rem'
              }}
            >
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateAgentForm;