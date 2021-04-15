import React, { FC } from "react";
import { ITodo } from "../typings";

interface IProps {
  todoList: ITodo[];
  removeTodo: (todo: ITodo) => void;
}

const TdList: FC<IProps> = ({ todoList, removeTodo }) => {
  const removeItem = (e: ITodo) => {
    console.log(e);
    removeTodo(e);
  };

  return (
    <ul>
      {todoList.map((item) => {
        return (
          <li key={item.id} onClick={() => removeItem(item)}>
            {item.content}
          </li>
        );
      })}
    </ul>
  );
};

export default TdList;
