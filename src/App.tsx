import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import AgentsList from './components/Agents/AgentsList';
import ChatWindow from './components/Chat/ChatWindow';
import CreateChatForm from './components/CreateChat/CreateChatForm';
import { AppView } from './types/types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('agents');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'agents':
        return <AgentsList />;
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
        return <AgentsList />;
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