import { ThemeContext } from "@/components/app-context";
import { Button, Input, Space } from "antd";
import { FC, useContext, useState } from "react";
import { ITodo } from "../typings";

interface IProps {
  todoList: ITodo[];
  addTodo: (todo: ITodo) => void;
}

const TdInput: FC<IProps> = ({ todoList, addTodo }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { theme } = useContext(ThemeContext);

  console.log(theme);

  const addItem = () => {
    const val = inputValue.trim();
    if (val?.length) {
      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false,
      });
    }
    setInputValue("");
  };

  return (
    <Space>
      <Input
        type="text"
        placeholder="请输入你的代办项"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={addItem}
      />
      <Button onClick={addItem}>增加</Button>
    </Space>
  );
};

export default TdInput;
