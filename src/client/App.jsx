import React from 'react';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';

const App = () => {
  return (
    <div>
      <h1>RAG System</h1>
      <FileUpload />
      <ChatInterface />
    </div>
  );
};

export default App;