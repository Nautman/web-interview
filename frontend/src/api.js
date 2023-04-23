const baseURL = 'http://localhost:3001'

export function getTodoLists() {
  return fetch(`${baseURL}/todos`).then((response) => response.json())
}

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
