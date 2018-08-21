const express = require('express')

const app = express()
const morgan = require('morgan')
const debug = require('debug')

const { readFileSync } = require('fs')
const { writeFile } = require('fs')

const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.use(express.static('public'))

const PORT = process.env.PORT || 4001

if (!process.env.IS_TEST_ENV) {
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(expressValidator())

const log = debug('DINA-SCHOOL:server')

function completeInputValidate(req, res, next) {
  log('validation')

  req.checkBody('todo', 'invalid todo').notEmpty()
  req.checkBody('done', 'invalid done').isBoolean()
  req.checkBody('date', 'invalid date').notEmpty()

  const errors = req.validationErrors()
  if (errors) {
    const response = { errors: [] }
    errors.forEach(err => {
      response.errors.push(err.msg)
    })

    res.statusCode = 400
    return res.json(response)
  }

  return next()
}
// function partialInputValidate(req, res, next) {}

function readTodosFromFile() {
  const file = readFileSync('todosNew.json', 'utf8')
  return JSON.parse(file)
}

function decorateStoredTodosMiddleware(req, res, next) {
  res.locals.todos = readTodosFromFile()
  return next()
}

function saveTodos(chunk) {
  const json = JSON.stringify(chunk)
  writeFile('todosNew.json', json, err => {
    if (err) log(`Failed to write file: ${err}`)
    else log('written to file.')
  })
}

function decorateStoredTodo(req, res, next) {
  const { todos } = res.locals
  const idToFind = Number(req.params.id)

  const rackIndex = todos.findIndex(todo => todo.id === idToFind)

  if (rackIndex !== -1) {
    res.locals.todo = todos[rackIndex]
    res.locals.todoIndex = rackIndex
    next()
  } else {
    res.status(404).send('That todo is not found.')
  }
  return next()
}

function fetchLastId(todos) {
  return todos[todos.length - 1].id
}

function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
}

app.use(cors)

app.get('/todos/', decorateStoredTodosMiddleware, (req, res) => {
  const { todos } = res.locals
  res.send(todos)
})

app.get(
  '/todos/:id',
  decorateStoredTodosMiddleware,
  decorateStoredTodo,
  (req, res) => {
    res.send(res.locals.todo)
  }
)

/*
  A reminder on how to create a new todo from 'postman' (choose-> POST, body+raw+JSON ) 
  {
          "too": "rest for 40 hours",
          "done": false,
          "date": "2018-08-11"
  }
*/
app.post(
  '/todos/',
  decorateStoredTodosMiddleware,
  completeInputValidate,
  (req, res) => {
    const { todos } = res.locals
    const lastIdentifier = fetchLastId(todos)
    const newTodo = req.body
    newTodo.id = lastIdentifier + 1
    todos.push(newTodo)
    saveTodos(todos)

    res.status(201).send(newTodo)
  }
)

/*
  A reminder on how to update a todo from 'postman' (choose-> PUT, body+raw+JSON )
  call : localhost:4001/todos/5 if you want to update index=5
  Body is below: 
    {
      "id": 2,
      "done": false,
      "todo": "eat sallad",
      "date": "2018-08-25"
    }
*/
app.put(
  '/todos/:id',
  decorateStoredTodosMiddleware,
  decorateStoredTodo,
  (req, res) => {
    const { todos } = res.locals
    const updatedTodo = req.body

    if (res.locals.todo.id !== updatedTodo.id) {
      res.status(400).send('Cannot update Todo Id')
    } else {
      todos[res.locals.todoIndex] = updatedTodo
      saveTodos(todos)
      res.status(201).send(todos[res.locals.todoIndex])
    }
  }
)

/*
  A reminder on how to patch a todo from 'postman' (choose-> PATCH, body+raw+JSON ) 
  call : http://localhost:4001/todos/6 
  only one attribute at a time: Body is below: 
    {"done": true}
*/
app.patch(
  '/todos/:id',
  decorateStoredTodosMiddleware,
  decorateStoredTodo,
  (req, res) => {
    const { body: todoInput } = req
    const { todos, todo: storedInput } = res.locals

    const updatedTodo = {
      ...storedInput,
      ...todoInput,
    }
    /*
    todoInput.todo = body.todo ? body.todo : storedTodo.todo
    todoInput.done = body.done ? body.done : storedTodo.done
    todoInput.date = body.date ? body.date : storedTodo.date
    */
    todos[res.locals.todoIndex] = updatedTodo

    saveTodos(todos)
    res.status(201).send(todoInput)
  }
)
/*
 TODO : removing the same item twice gives an error
*/
app.delete(
  '/todos/:id',
  decorateStoredTodosMiddleware,
  decorateStoredTodo,
  (req, res) => {
    const { todos } = res.locals

    todos.splice(res.locals.todoIndex, 1)
    saveTodos(todos)
    res.status(204).send()
  }
)

app.listen(PORT, () => {
  log(`Server is listening on port ${PORT}`)
})
