import React, { Fragment, useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { useTodoLists } from '../../hooks'
import { calcListCompletion } from '../../misc/calcListCompletion'

export const TodoLists = ({ style }) => {
  const { todoLists, updateList } = useTodoLists()
  const [activeList, setActiveList] = useState()

  // We use callback for saveTodoList to avoid infinite loop
  // because we use it in useEffect
  const saveTodoList = useCallback(
    (listId, { todos }) => {
      updateList({
        listId,
        todos,
      })
    },
    [updateList]
  )

  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => {
              const [completedTodos, totalTodos] = calcListCompletion(todoLists[key].todos)

              return (
                <ListItemButton key={key} onClick={() => setActiveList(key)}>
                  <ListItemIcon>
                    <ReceiptIcon />
                  </ListItemIcon>
                  <ListItemText
                    // strikethrough completed todos
                    primary={
                      <span
                        style={{
                          textDecoration:
                            totalTodos !== 0 && completedTodos === totalTodos
                              ? 'line-through'
                              : 'none',
                        }}
                      >
                        {todoLists[key].title}
                      </span>
                    }
                    secondary={
                      totalTodos !== 0 && (
                        <span>
                          {completedTodos} / {totalTodos} completed
                        </span>
                      )
                    }
                  />
                </ListItemButton>
              )
            })}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          todoList={todoLists[activeList]}
          saveTodoList={saveTodoList}
        />
      )}
    </Fragment>
  )
}
