import { useGlobalContext } from "../utils/Context"
import { Todo } from "../utils/model";
import { TodoElement } from "./TodoElement";

export const TodoList = () => {
  const { todos, todo } = useGlobalContext();
  console.log('input value: ', todo);
  console.log('List: ', todos);


  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 w-6/7">
        <div>
          <div className="bg-red-400 mx-1 py-5 my-2 rounded-full shadow-2xl border-2 border-solid border-red-500">
            <h1 className="font-bold">Task's not Done</h1>
          </div>
          {
            todos.map((element: Todo) => {
              if (!element.isDone){
                return <TodoElement key={element.id} id={element.id} todoValue={element.todo} isDone={element.isDone} />  
              }
            })
          }
        </div>
        <div>
          <div className="bg-green-400 py-5 my-2 mx-1 rounded-full shadow-2xl border-2 border-solid border-green-500">
            <h1 className="font-bold">Task's Done</h1>
          </div>
          {
            todos.map((element: Todo) => {
              if (element.isDone){
                return <TodoElement key={element.id} id={element.id} todoValue={element.todo} isDone={element.isDone} />  
              }
            })
          }
        </div>
      </div>
    </div>
  )
}