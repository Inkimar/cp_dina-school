import React from 'react'

export default class TodoList extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  componentDidMount() {
    let initialsTodos = []
    fetch('http://localhost:4001/todos')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          todos: data,
        })
      })
  }

  // https://reactjs.org/docs/lists-and-keys.html
  render() {
    console.log(this.state.todos)
    let allTodos = this.state.todos
    let listItems = allTodos.map(todo => (
      <li>
        {todo.id} : {todo.name} : {todo.date} -{' '}
        {todo.done === true ? 'true' : 'false'}
      </li>
    ))
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    )
  }
}
