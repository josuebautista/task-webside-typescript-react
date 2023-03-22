import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import { useGlobalContext } from "../utils/Context";

interface Props {
  id: number;
  todoValue: string;
  isDone: boolean
}

export const TodoElement = ({ id, todoValue, isDone }: Props) => {
  const { handleDone, handleDelete, handleEdit } = useGlobalContext();
  return (
    <div className={`${ isDone ? "bg-purple-700" : "bg-indigo-400"} py-5 my-2 rounded-full shadow-2xl border-2 border-solid border-indigo-500`}>
      <div className=" grid grid-cols-5">
        <div className=" col-span-4 text-start text-xl pl-9 pt-2">
          {todoValue}
        </div>
        <div className="grid grid-cols-3 pr-7 py-3 text-xl">
          <div onClick={() => handleEdit(id)} className="hover:text-gray-500" style={{cursor: 'pointer'}}     >
            <FaEdit />
          </div>
          <div onClick={() => handleDelete(id)} className="hover:text-gray-500" style={{cursor: 'pointer'}}>
            <FaTrash />
          </div>
          <div onClick={() => handleDone(id)} className={ isDone ? "hover:text-red-500" : "hover:text-green-500"} style={{cursor: 'pointer'}}>
            <FaCheck />
          </div>
        </div>
      </div>
    </div>

  )
}