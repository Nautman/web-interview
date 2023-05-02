const baseURL = 'http://localhost:3001'

// Get all todos from all lists
export function getTodoLists() {
  return fetch(`${baseURL}/todos`).then((response) => response.json())
}

// Modify a list by it's ID
export function updateList({ listId, todos }) {
  return fetch(`${baseURL}/list/${listId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todos,
    }),
  }).then((response) => response.json())
}

const api = {
  getTodoLists,
  updateList,
}

export default api
