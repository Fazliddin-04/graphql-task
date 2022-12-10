import React, { useState } from 'react'
import request from '../assets/request'

function TodoItem({ todo, onDelete }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed)

  const UpdateTodoInput = {
    id: todo.id,
    input: {
      completed: !todo.completed,
    },
  }

  const onTodoComplete = () => {
    request({
      query: `mutation updateTodoHandler($id: ID!, $input: UpdateTodoInput!) {
      updateTodo(id: $id, input: $input) {
        completed
      }
    }`,
      variables: UpdateTodoInput,
    })

    setIsCompleted((prev) => !prev)
  }

  const onDeleteHandler = () => {
    onDelete()
    request({
      query: `mutation deleteTodoHandler($id: ID!) {
        deleteTodo(id: $id)
      }`,
      variables: { id: todo.id },
    })
  }

  return (
    <div
      className={`todo_item ${isCompleted ? 'completed' : ''}`}
      onClick={onTodoComplete}
      onContextMenu={onDeleteHandler}
    >
      {todo.title}
    </div>
  )
}

export default TodoItem
