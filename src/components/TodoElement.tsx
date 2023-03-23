import { Draggable } from "react-beautiful-dnd";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useGlobalContext } from "../utils/Context";

interface Props {
  id: number;
  todoValue: string;
  isDone: boolean;
  index: number;
}

export const TodoElement = ({ id, todoValue, isDone, index }: Props) => {
  const { handleDone, handleDelete, handleEdit } = useGlobalContext();
  return (
    <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div className={` w-full flex justify-center`}>
          <div {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${isDone ? "bg-purple-700" : "bg-indigo-400"} lg:3/4 md:w-5/6 sm:w-full py-5 my-2 rounded-full ${snapshot.isDragging ? "bg-cyan-500 shadow-2xl shadow-slate-300 " : "shadow-2xl"} border-2 border-solid border-indigo-500`}>
            <div className=" grid grid-cols-5">
              <div className=" col-span-4 text-start text-xl pl-9 pt-2">
                {todoValue}
              </div>
              <div className="grid grid-cols-3 pr-7 py-3 text-xl">
                <div onClick={() => handleEdit(id)} className="hover:text-gray-500" style={{ cursor: 'pointer' }}     >
                  <FaEdit />
                </div>
                <div onClick={() => handleDelete(id)} className="hover:text-gray-500" style={{ cursor: 'pointer' }}>
                  <FaTrash />
                </div>
                <div onClick={() => handleDone(id)} className={isDone ? "hover:text-red-500" : "hover:text-green-500"} style={{ cursor: 'pointer' }}>
                  <FaCheck />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}