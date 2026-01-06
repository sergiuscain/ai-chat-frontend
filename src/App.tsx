import React, { useState, useEffect } from 'react';
import MainLayout from './components/Layout/MainLayout';
import AgentsList from './components/Agents/AgentsList';
import ChatWindow from './components/Chat/ChatWindow';
import CreateChatForm from './components/CreateChat/CreateChatForm';
import CreateAgentForm from './components/Agents/CreateAgentForm';
import { AppView } from './types/types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('agents');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [agentsRefreshKey, setAgentsRefreshKey] = useState(0);

  const handleAgentCreated = () => {
    setAgentsRefreshKey(prev => prev + 1);
    setCurrentView('agents'); // Возвращаемся к списку агентов
  };

  const renderView = () => {
    switch (currentView) {
      case 'agents':
        return <AgentsList key={agentsRefreshKey} />;
      case 'createAgent':
        return <CreateAgentForm onAgentCreated={handleAgentCreated} onCancel={() => setCurrentView('agents')} />;
      case 'createChat':
        return (
          <CreateChatForm
            onCreateChat={(chatId: string) => {
              setActiveChatId(chatId);
              setCurrentView('chat');
            }}
          />
        );
      case 'chat':
        return activeChatId ? <ChatWindow chatId={activeChatId} /> : <div>Чат не выбран</div>;
      default:
        return <AgentsList key={agentsRefreshKey} />;
    }
  };

  return (
    <MainLayout
      currentView={currentView}
      onChangeView={setCurrentView}
      chatId={activeChatId}
    >
      {renderView()}
    </MainLayout>
  );
}

export default App;