import React, { ReactNode } from 'react';
import { AppView } from '../../types/types';

interface MainLayoutProps {
  children: ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  chatId: string | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  currentView, 
  onChangeView, 
  chatId 
}) => {
  const getButtonStyle = (view: AppView) => ({
    margin: '0 0.25rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: currentView === view ? '#61dafb' : '#282c34',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  });

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#20232a',
        color: 'white',
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>AI Agents Chat</h1>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          <button 
            onClick={() => onChangeView('agents')} 
            style={getButtonStyle('agents')}
          >
            Агенты
          </button>
          <button 
            onClick={() => onChangeView('createAgent')} 
            style={getButtonStyle('createAgent')}
          >
            Создать агента
          </button>
          <button 
            onClick={() => onChangeView('createChat')} 
            style={getButtonStyle('createChat')}
          >
            Создать чат
          </button>
          {chatId && (
            <button 
              onClick={() => onChangeView('chat')} 
              style={getButtonStyle('chat')}
            >
              Чат ({chatId.substring(0, 8)}...)
            </button>
          )}
        </nav>
      </header>
      <main style={{
        flex: 1,
        padding: '1rem',
        overflow: 'auto'
      }}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;