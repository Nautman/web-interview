import { useState, useEffect, useCallback } from 'react'
import api from './api'

export function useTodoLists() {
  const [todoLists, setTodoLists] = useState({})

  const getTodoLists = () => {
    api.getTodoLists().then(setTodoLists)
  }

  const updateList = useCallback(({ listId, todos }) => {
    api.updateList({ listId, todos }).then((newList) => {
      setTodoLists((todos) => ({
        ...todos,
        [listId]: newList,
      }))
    })
  }, [])

  useEffect(() => {
    getTodoLists()
  }, [])

  return {
    updateList,
    todoLists,
  }
}
