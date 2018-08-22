import React from 'react'
import './AppTodos.css'
import TodoList from './TodoList'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  handleClick(key) {
    console.log('Main: handles click ')
    alert('Main: you pressed ' + key)
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoList onClick={this.handleClick} />
      </div>
    )
  }
}
