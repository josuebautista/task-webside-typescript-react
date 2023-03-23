import React, { useContext, useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Todo } from "./model";
import { nanoid } from 'nanoid';

type AppValues = {
  [key: string]: any
}
const AppContext = React.createContext<AppValues>({})

interface Props {
  children: JSX.Element
}


const AppProvider = ({ children }: Props) => {

  const generateId = () => {
    return nanoid()
  }


  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosCompleted, setTodosCompleted] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number>(0);
  const [focusEdit, setFocusEdit] = useState<boolean>(false);
  const [list2Id, setList2Id] = useState<string>(generateId());
  const [list1Id, setList1Id] = useState<string>(generateId());

  useEffect(() => {
    setList1Id(generateId())
    setList2Id(generateId())
  }, [todos, todosCompleted])

  useEffect(() => {
    if (todos.find(todo => todo.isDone === true)) {
      setTodosCompleted(todos.filter(todo => todo.isDone === true));
    } else if (todosCompleted.length === 1) {
      todos.map((todo => {
        if (todo.id === todosCompleted[0].id) {
          setTodosCompleted([]);
        }
      }))
    }
  }, [todos])


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo !== '') {
      if (editId !== 0) {
        let todoFounded: Todo | undefined;
        if (todos.some(todo => todo.id === editId)) {
          todoFounded = todos.find(todo => todo.id === editId);
        } else {
          todoFounded = todosCompleted.find(todo => todo.id === editId);
        }
        if (todoFounded) {
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
    const todoDoneCheck = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone }
      }
      return todo
    });
    setTodos(todoDoneCheck);
  }

  const handleDelete = (id: number) => {
    if (todos.some(todo => todo.id === id)) {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      setTodosCompleted(todosCompleted.filter(todo => todo.id !== id));
      setTodos(todos)
    }
  }

  const handleEdit = (id: number) => {
    let todoFounded: Todo | undefined;
    if (todos.some(todo => todo.id === id)) {
      todoFounded = todos.find(todo => todo.id === id);
    } else {
      todoFounded = todosCompleted.find(todo => todo.id === id);
    }
    if (todoFounded) {
      setTodo(todoFounded.todo);
      setEditId(id);
      setFocusEdit(true);
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let getSingleTodo: Todo;

    if (source.droppableId === list1Id) {
      getSingleTodo = todos[source.index]
      todos.splice(source.index, 1);
    } else {
      getSingleTodo = todosCompleted[source.index]
      todosCompleted.splice(source.index, 1);
    }

    if (destination.droppableId === list1Id) {
      if (source.droppableId === list1Id) {
        todos.splice(destination.index, 0, getSingleTodo);
      } else {
        getSingleTodo.isDone = !getSingleTodo.isDone;
        todos.splice(destination.index, 0, getSingleTodo);
      }
      setTodos(todos)
    } else {
      if (source.droppableId === list1Id) {
        getSingleTodo.isDone = !getSingleTodo.isDone;
        todosCompleted.splice(destination.index, 0, getSingleTodo);
      } else {
        todosCompleted.splice(destination.index, 0, getSingleTodo);
      }
    }

    if (todos.find(todo => todo.isDone === true)) {
      setTodosCompleted(todos.filter(todo => todo.isDone === true));
    }
    setTodos(todos.filter(todo => todo.isDone === false));
  }

  return (
    <AppContext.Provider value={{
      todo,
      setTodo,
      todos,
      todosCompleted,
      setTodos,
      handleAdd,
      handleDone,
      handleDelete,
      handleEdit,
      focusEdit,
      onDragEnd,
      list1Id,
      list2Id,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppProvider, AppContext };