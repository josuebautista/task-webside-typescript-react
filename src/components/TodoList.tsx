import { useGlobalContext } from "../utils/Context"
import { Todo } from "../utils/model";
import { TodoElement } from "./TodoElement";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const TodoList = () => {
  const { todos, todosCompleted, onDragEnd, list1Id, list2Id} = useGlobalContext();
  //let indexLista1 = 0;
  //let indexLista2 = 0;
  return (
    <div className="flex justify-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 w-3/4 md:w-5/6 sm:w-full">
          <Droppable droppableId={list1Id}>
            {(provided, snapshot) => (
              <div className="w-full">
                <div ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={` ${ snapshot.isDraggingOver ? "bg-red-600" : "bg-red-400"} py-5 my-2 mx-1 w-100 rounded-3xl shadow-2xl border-2 border-solid border-red-500`}>
                  <h1 className="font-bold">Task's Not Done</h1>
                  {
                    todos.map((element: Todo, index: number) => {
                      if (!element.isDone) {
                        //indexLista1 += 1

                        return <TodoElement
                          key={element.id}
                          index={index}
                          id={element.id}
                          todoValue={element.todo}
                          isDone={element.isDone} />
                      }

                    })
                  }
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          <Droppable droppableId={list2Id}>
            {(provided, snapshot) => (
              <div className="w-full">
                <div ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={` ${ snapshot.isDraggingOver ? "bg-green-600" : "bg-green-400"} py-5 my-2 mx-1 w-100 rounded-3xl shadow-2xl border-2 border-solid border-green-500`}>
                  <h1 className="font-bold">Task's Done</h1>
                  {
                    todosCompleted.map((element: Todo, index: number) => {
                      if (element.isDone) {
                        //indexLista2 += 1;
                        return <TodoElement
                          key={element.id}
                          index={index}
                          id={element.id}
                          todoValue={element.todo}
                          isDone={element.isDone} />

                      }
                    })
                  }
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}