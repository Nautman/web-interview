import React, { useEffect, useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    if (!updated) return
    const timeout = setTimeout(() => {
      saveTodoList(todoList.id, { todos })
    }, 300)
    return () => clearTimeout(timeout)
  }, [todos, todoList.id, saveTodoList, updated])

  const updateTodos = (index, newTodo) => {
    setTodos([
      // immutable update
      ...todos.slice(0, index),
      {
        ...todos[index],
        ...newTodo,
      },
      ...todos.slice(index + 1),
    ])
    setUpdated(true)
  }

  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2'>{todoList.title}</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {todos.map(({ title }, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <Button
                sx={{ margin: '8px' }}
                size='small'
                color={todos[index].completed ? 'success' : 'primary'}
                onClick={() => {
                  updateTodos(index, { completed: !todos[index].completed })
                }}
              >
                <CheckIcon />
              </Button>
              <div
                style={{
                  flex: 1,
                  flexGrow: 1,
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <TextField
                  fullWidth
                  label='What to do?'
                  defaultValue={title}
                  onChange={(event) => {
                    updateTodos(index, { title: event.target.value })
                  }}
                />
                <div
                  style={{
                    // red if late
                    color:
                      todos[index].dueDate && new Date(todos[index].dueDate) < new Date()
                        ? 'red'
                        : 'inherit',
                  }}
                >
                  <input
                    style={{ color: 'inherit' }}
                    type='date'
                    label='Due Date'
                    value={todos[index].dueDate}
                    onChange={(event) => {
                      updateTodos(index, { dueDate: event.target.value })
                    }}
                  />
                  {todos[index].dueDate &&
                    (new Date(todos[index].dueDate) < new Date() ? (
                      <Typography color='error' variant='caption'>
                        Overdue by{' '}
                        {Math.round((new Date() - new Date(todos[index].dueDate)) / 86400000)} days
                      </Typography>
                    ) : (
                      <Typography variant='caption'>
                        Due in{' '}
                        {Math.round((new Date(todos[index].dueDate) - new Date()) / 86400000)} days
                      </Typography>
                    ))}
                </div>
              </div>

              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ])
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { title: '', completed: false, dueDate: undefined }])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
