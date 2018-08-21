import React from 'react'
import './AppTodos.css'
import TodoList from './TodoList'

const url = `http://localhost:4001/todos`

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoList />
      </div>
    )
  }
}
