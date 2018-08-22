import React from 'react'

export default class TodoList extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: [],
    }
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
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

  /*
  handleClick(key) {
    console.log('handles click ' + key)
    alert('you pressed ' + key)
  }
*/
  // https://reactjs.org/docs/lists-and-keys.html
  render() {
    let allTodos = this.state.todos
    let listItems = allTodos.map(todo => (
      <li>
        {todo.id} : {todo.name} : {todo.date} -{' '}
        {todo.done === true ? 'true' : 'false'}
        <div>
          <button onClick={event => this.props.onClick('delete')}>
            delete
          </button>
          <button onClick={event => this.props.onClick('edit')}>edit</button>
        </div>
      </li>
    ))
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    )
  }
}
