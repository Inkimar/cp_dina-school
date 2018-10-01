import React from 'react'

export default class TodoList extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  fetchAllTodos() {
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

  handleDelete(event, key) {
    // console.log('deletion ', key)
    const url = `http://localhost:4001/todos/${key}`
    fetch(url, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      this.fetchAllTodos()

      return response.json()
    })
  }

  // https://reactjs.org/docs/lists-and-keys.html
  render() {
    const allTodos = this.state.todos
    const listItems = allTodos.map(todo => (
      <li key={todo.id}>
        {todo.id} : {todo.name} : {todo.date} -{' '}
        {todo.done === 'true'
          ? 'true'
          : 'false' /* kolla upp 'true' ska vara en boolean, ändra */}
        <div>
          <button onClick={event => this.handleDelete(event, todo.id)}>
            delete
          </button>
          <button onClick={() => this.props.onClick('update', todo.id)}>
            edit
          </button>
        </div>
      </li>
    ))
    return (
      <div>
        <h1>All of your Todos</h1>
        <ul>{listItems}</ul>
        <button onClick={event => this.props.onClick('create')}>
          Add a new Todo
        </button>
      </div>
    )
  }
}
