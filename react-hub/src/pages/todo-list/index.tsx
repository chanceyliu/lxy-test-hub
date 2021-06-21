import { FC, useCallback, useEffect, useState } from 'react'
import TdInput from './input'
import TdList from './list'
import { ITodo } from './typings'
import { ThemeContext } from '@/components/app-context'

function useTodo() {
  const [todoList, setTodoList] = useState<ITodo[]>([])

  useEffect(() => {
    console.log(todoList)
  }, [todoList])

  const addTodo = useCallback(
    (todo: ITodo) => {
      setTodoList([...todoList, todo])
    },
    [todoList],
  )

  const removeTodo = useCallback(
    (todo: ITodo) => {
      const newTodoList = todoList.filter((item) => item.id !== todo.id)
      setTodoList(newTodoList)
    },
    [todoList],
  )
  return {
    todoList,
    addTodo,
    removeTodo,
  }
}

const TodoList: FC = () => {
  const { todoList, addTodo, removeTodo } = useTodo()

  return (
    <ThemeContext.Provider value={{ theme: 'BIG' }}>
      <TdInput todoList={todoList} addTodo={addTodo}></TdInput>
      <TdList todoList={todoList} removeTodo={removeTodo}></TdList>
    </ThemeContext.Provider>
  )
}

export default TodoList
