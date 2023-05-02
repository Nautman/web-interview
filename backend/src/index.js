const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

// Map for storing lists of todos, key is the id of the list, the value is an object with the title and todos
const lists = new Map()

// Create initial lists based on the example
lists.set('0000000001', {
  title: 'My first list',
  todos: [],
})
lists.set('0000000002', {
  title: 'Second list',
  todos: [],
})

app.get('/', (req, res) => res.send('Hello World!'))

/**
 * Get all todos from all lists
 */
app.get('/todos', (req, res) => {
  // Create a map with the lists, with the lists' id as the key and the lists' info as the value
  const listsWithInfo = new Map()
  // Loop through all lists and add the id to the list info
  lists.forEach((list, id) => {
    listsWithInfo.set(id, {
      ...list,
      id,
    })
  })

  res.send(Object.fromEntries(listsWithInfo.entries()))
})

/**
 * Modify a list by it's ID
 * @param {string} id - The id of the list
 */
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
    // Check if title is string and length <= 128
    if (typeof todo.title !== 'string' || todo.title.length > 128) {
      return false
    }
    // Check if completed is boolean
    if (todo.completed !== true && todo.completed !== false) {
      return false
    }
    // Check if due date is defined, and is a valid date of format YYYY-MM-DD by parsing it
    if (todo.dueDate) {
      const dueDate = new Date(todo.dueDate)
      if (dueDate.toString() === 'Invalid Date') {
        return false
      }
    }
    return true
  })

  if (!validTodos) {
    res.status(400).send('Invalid todos')
    return
  }

  // In case todos are valid, update the list
  lists.set(id, {
    ...lists.get(id),
    todos,
  })

  // Send the updated list back
  res.send({ ...lists.get(id), id })
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
