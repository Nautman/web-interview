import { useState, useEffect, useCallback } from 'react'
import api from './api'

// Hook to fetch all todo lists and update specific lists
export function useTodoLists() {
  const [todoLists, setTodoLists] = useState({})

  const getTodoLists = () => {
    api.getTodoLists().then(setTodoLists)
  }

  const updateList = useCallback(({ listId, todos }) => {
    api.updateList({ listId, todos }).then((newList) => {
      // When updating list, update the list in the state
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
