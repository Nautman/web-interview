import React, { useCallback } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'

// Component to display and edit a single todo item
function TodoItem({ dueDate, title, index, completed, updateTodoListByTodo, deleteTodo }) {
  const differenceInDays = Math.round((new Date() - new Date(dueDate)) / 86400000)
  const isLate = differenceInDays > 0

  /**
   * Callbacks to update the todo
   * These are wrapped in useCallback to prevent unnecessary re-renders
   */
  const completeTodo = useCallback(() => {
    updateTodoListByTodo(index, { completed: !completed })
  }, [updateTodoListByTodo, index, completed])
  const editTodoTitle = useCallback(
    (event) => {
      updateTodoListByTodo(index, { title: event.target.value })
    },
    [updateTodoListByTodo, index]
  )
  const editTodoDueDate = useCallback(
    (event) => {
      updateTodoListByTodo(index, { dueDate: event.target.value })
    },
    [updateTodoListByTodo, index]
  )

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
      <Button sx={{ margin: '8px' }} size='small' onClick={completeTodo}>
        {completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
      </Button>
      <TextField
        fullWidth
        placeholder='What to do?'
        defaultValue={title}
        onChange={editTodoTitle}
        variant='standard'
        inputProps={{
          // strikethrough completed todos
          style: {
            textDecorationLine: completed ? 'line-through' : 'none',
            color: completed ? 'gray' : 'inherit',
            // elipsis for long titles
            textOverflow: 'ellipsis',
          },
          maxLength: 128,
        }}
      />
      <Typography
        variant='body1'
        style={{
          whiteSpace: 'nowrap',
          color: completed ? 'gray' : isLate ? 'red' : 'inherit',
          borderBottom: '1px solid gray',
          height: '1.95rem',
          lineHeight: '2rem',
        }}
      >
        {dueDate &&
          !completed &&
          (differenceInDays === 0
            ? 'Due today, '
            : differenceInDays > 0
            ? `${differenceInDays} day${differenceInDays === 1 ? '' : 's'} late, `
            : `Due in ${-differenceInDays} day${differenceInDays === -1 ? '' : 's'}, `)}
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
          defaultValue={dueDate}
          onChange={editTodoDueDate}
        />
      </div>
      <Button sx={{ margin: '8px' }} size='small' color='inherit' onClick={deleteTodo}>
        <DeleteIcon />
      </Button>
    </div>
  )
}

export default TodoItem
