import { FC, useContext, useRef } from "react";
import { ThemeContext } from "../../../components/app-context";
import { ITodo } from "../typings";

interface IProps {
  todoList: ITodo[];
  addTodo: (todo: ITodo) => void;
}

const TdInput: FC<IProps> = ({ todoList, addTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useContext(ThemeContext);
  console.log(theme, "-------++++++");

  const addItem = () => {
    const val = inputRef.current?.value.trim();
    if (val?.length) {
      const isExist = todoList.find((todo) => todo.content === val);
      if (isExist) {
        alert("该事件已存在");
        return;
      }
      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false,
      });

      inputRef.current!.value = "";
    }
  };

  return (
    <div>
      <input type="text" placeholder="请输入你的代办项" ref={inputRef} />
      <button onClick={addItem}>增加</button>
    </div>
  );
};

export default TdInput;
