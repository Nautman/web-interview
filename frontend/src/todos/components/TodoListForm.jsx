import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TodoItem from './TodoItem'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  // Initialize todos from the todoList prop
  const [todos, setTodos] = useState(todoList.todos)
  // State to track if todos have been updated, used to trigger the effect below
  const [updated, setUpdated] = useState(false)

  // Effect to save todos when updated in a debounced manner
  // Saving is done 300ms after the last update
  useEffect(() => {
    if (!updated) return
    const timeout = setTimeout(() => {
      saveTodoList(todoList.id, { todos })
    }, 300)
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timeout)
  }, [todos, todoList.id, saveTodoList, updated])

  // Callback to update a todo in the todos array
  // Params are the index of the todo, and the new todo object
  const updateTodoListByTodo = useCallback(
    (index, newTodo) => {
      setTodos([
        // Get all todos before the updated one
        ...todos.slice(0, index),
        // Replace the updated todo with the new one
        {
          ...todos[index],
          ...newTodo,
        },
        // Get all todos after the updated one
        ...todos.slice(index + 1),
      ])
      // Set updated to true to trigger the saving effect
      setUpdated(true)
    },
    [setTodos, todos]
  )

  // Callback to delete a todo by index
  const deleteTodo = useCallback(
    (index) => {
      setTodos([...todos.slice(0, index), ...todos.slice(index + 1)])
      setUpdated(true)
    },
    [setTodos, todos]
  )

  // Callback to add a new todo
  const addTodo = useCallback(() => {
    setTodos([...todos, { title: '', completed: false, dueDate: undefined }])
  }, [setTodos, todos])

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          {todos.map(({ title, completed, dueDate }, index) => (
            <TodoItem
              key={index}
              index={index}
              title={title}
              completed={completed}
              dueDate={dueDate}
              updateTodoListByTodo={updateTodoListByTodo}
              deleteTodo={deleteTodo}
            />
          ))}
          <CardActions>
            <Button type='button' color='primary' onClick={addTodo}>
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
