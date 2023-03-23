import React, { useRef } from "react";
import { useGlobalContext } from "../utils/Context";
import { FaChevronRight } from "react-icons/fa";


export const InputField = () => {
  const { setTodo, todo, handleAdd, focusEdit } = useGlobalContext();
  const inputRef = useRef<HTMLInputElement>(null);
  if (focusEdit){
    inputRef.current?.focus();
  }
  return (
    <div className="w-100 py-4">
      <form className="" onSubmit={(e: React.FormEvent) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}>
        <input 
          type="input"
          ref={inputRef}
          className="py-4 w-2/3 rounded-full h-full text-black text-center text-2xl transitioninput transition delay-150 focus:scale-105 focus:rounded-full"
          placeholder=" Enter a task"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}>
          
        </input>
        <button className="z-10 text-3xl py-4 px-4 hover:text-blue-700 text-white font-bold rounded absolute" type="submit">
          <FaChevronRight/>
        </button>
      </form>
    </div>
  )
} 