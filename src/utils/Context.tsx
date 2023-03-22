import React, { useContext, useState } from "react";
import { Todo } from "./model";

type AppValues = {
  [key: string]: any
}
const AppContext = React.createContext<AppValues>({})

interface Props {
  children: JSX.Element
}


const AppProvider = ({ children }: Props) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number>(0);
  const [focusEdit, setFocusEdit] = useState<boolean>(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo !== '') {
      if (editId !== 0){
        const todoFounded = todos.find(todo => todo.id === editId);
        if (todoFounded){
          todoFounded.todo = todo;
        }
        setFocusEdit(false);
        setEditId(0);
        setTodo("");
      } else {
        setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
        setTodo('');
      }
    }
  };

  const handleDone = (id: number) => {
    console.log(id);
    const todoDoneCheck = todos.map(todo => {
      if (todo.id === id){
        return {...todo, isDone: !todo.isDone}
      }
      return todo
    });
    setTodos(todoDoneCheck)
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id ));
  }

  const handleEdit = (id: number) => {
    const todoFounded = todos.find(todo => todo.id === id);
    if (todoFounded){
      setTodo(todoFounded.todo);
      setEditId(id);
      setFocusEdit(true);
    }
  }

  return (
    <AppContext.Provider value={{
      todo,
      setTodo,
      todos,
      setTodos,
      handleAdd,
      handleDone,
      handleDelete,
      handleEdit,
      focusEdit
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppProvider, AppContext }