// src/App.jsx
import { useState } from 'react';
import EventListPage from './pages/EventListPage';
import EventCreationWizard from './components/EventCreationWizard';

function App() {
  // This state determines which view is currently visible
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'

  const showListPage = () => setCurrentView('list');
  const showCreatePage = () => setCurrentView('create');

  return (
    <div className="min-h-screen bg-slate-100">
      {currentView === 'list' ? (
        <EventListPage onNavigateToCreate={showCreatePage} />
      ) : (
        <EventCreationWizard onSubmissionSuccess={showListPage} />
      )}
    </div>
  );
}

export default App;