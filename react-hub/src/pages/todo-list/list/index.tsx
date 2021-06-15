import { FC } from 'react'
import { ITodo } from '../typings'
import styles from './index.module.css'

interface IProps {
  todoList: ITodo[]
  removeTodo: (todo: ITodo) => void
}

const TdList: FC<IProps> = ({ todoList, removeTodo }) => {
  const removeItem = (e: ITodo) => {
    console.log(e)
    removeTodo(e)
  }

  return (
    <ul className={styles.bg}>
      {todoList.map((item) => (
        <li key={item.id} onClick={() => removeItem(item)}>
          {item.content}
        </li>
      ))}
    </ul>
  )
}

export default TdList
