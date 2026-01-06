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
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>AI Agents Chat</h1>
        <nav>
          <button
            onClick={() => onChangeView('agents')}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'agents' ? '#61dafb' : '#282c34',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Агенты
          </button>
          <button
            onClick={() => onChangeView('createChat')}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: currentView === 'createChat' ? '#61dafb' : '#282c34',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Создать чат
          </button>
          {chatId && (
            <button
              onClick={() => onChangeView('chat')}
              style={{
                margin: '0 0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: currentView === 'chat' ? '#61dafb' : '#282c34',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Текущий чат ({chatId.substring(0, 8)}...)
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