const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

// Map for storing lists of todos, key is the id of the list
const lists = new Map()

// Create initial lists
lists.set('0000000001', {
  title: 'My first list',
  todos: [],
})
lists.set('0000000002', {
  title: 'Second list',
  todos: [],
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/todos', (req, res) => {
  const listsWithInfo = new Map()
  lists.forEach((list, id) => {
    listsWithInfo.set(id, {
      ...list,
      id,
    })
  })

  res.send(Object.fromEntries(listsWithInfo.entries()))
})

app.put('/list/:id', (req, res) => {
  const { id } = req.params
  if (!lists.has(id)) {
    res.status(400).send('List does not exist')
    return
  }
  const { todos } = req.body

  if (!todos) {
    res.status(400).send('Missing todos')
    return
  }

  // Validate each todo
  const validTodos = todos.every((todo) => {
    if (!todo.title) {
      return false
    }
    if (todo.completed === undefined) {
      return false
    }
    return true
  })

  if (!validTodos) {
    res.status(400).send('Invalid todos')
    return
  }

  lists.set(id, {
    ...lists.get(id),
    todos,
  })
  res.send({ ...lists.get(id), id })
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
