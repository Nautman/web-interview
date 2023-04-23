import { useState, useEffect } from 'react'
import api from './api'

export function useTodoLists() {
  const [todoLists, setTodoLists] = useState({})

  const getTodoLists = () => {
    api.getTodoLists().then(setTodoLists)
  }

  const updateList = ({ listId, todos }) => {
    api.updateList({ listId, todos }).then((newList) => {
      setTodoLists((todos) => ({
        ...todos,
        [listId]: newList,
      }))
    })
  }

  useEffect(() => {
    getTodoLists()
  }, [])

  return {
    updateList,
    todoLists,
  }
}
