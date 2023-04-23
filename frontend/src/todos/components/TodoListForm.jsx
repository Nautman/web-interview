import React, { useEffect, useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

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
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          {todos.map(({ title, completed, dueDate }, index) => {
            const isLate = dueDate && new Date(dueDate) < new Date()
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '0.5rem',
                  margin: '0.5rem 0',
                }}
              >
                <Button
                  sx={{ margin: '8px' }}
                  size='small'
                  onClick={() => {
                    updateTodos(index, { completed: !completed })
                  }}
                >
                  {completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                </Button>
                <TextField
                  fullWidth
                  placeholder='What to do?'
                  defaultValue={title}
                  onChange={(event) => {
                    updateTodos(index, { title: event.target.value })
                  }}
                  variant='standard'
                  inputProps={{
                    // strikethrough completed todos
                    style: {
                      textDecorationLine: completed ? 'line-through' : 'none',
                      color: completed ? 'gray' : 'inherit',
                    },
                  }}
                />
                <Typography
                  variant='body1'
                  style={{
                    // Don't break text
                    whiteSpace: 'nowrap',
                    color: completed ? 'gray' : isLate ? 'red' : 'inherit',
                    borderBottom: '1px solid gray',
                    height: '1.95rem',
                    lineHeight: '2rem',
                  }}
                >
                  {dueDate &&
                    !completed &&
                    (isLate
                      ? `${Math.round(
                          (new Date() - new Date(todos[index].dueDate)) / 86400000
                        )} days late, `
                      : `due in ${Math.round(
                          (new Date(todos[index].dueDate) - new Date()) / 86400000
                        )} days, `)}
                </Typography>
                <div>
                  <TextField
                    sx={{
                      input: {
                        color: completed ? 'gray' : isLate ? 'red' : 'inherit',
                      },
                    }}
                    type='date'
                    variant='standard'
                    defaultValue={todos[index].dueDate}
                    onChange={(event) => {
                      updateTodos(index, { dueDate: event.target.value })
                    }}
                  />
                </div>
                <Button
                  sx={{ margin: '8px' }}
                  size='small'
                  color='inherit'
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
            )
          })}
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
