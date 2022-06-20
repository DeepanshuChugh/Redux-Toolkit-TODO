import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import TodoContent from './components/TodoContent';

function App() {
  return (
    <div className="container">
      <PageTitle>TODO LIST</PageTitle>
      <AppHeader />
      <TodoContent />
      <Toaster />
    </div>
  );
}

export default App;
