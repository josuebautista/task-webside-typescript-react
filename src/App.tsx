import './App.css';
import React from 'react';
import { Header } from './components/Header';
import { InputField } from './components/InputField';
import { TodoList } from './components/TodoList';

const App: React.FC = () => {

  return (
    <div className="text-center text-white py-2">
      <Header />
      <InputField />
      <TodoList/>
    </div>
  )
}

export default App;
