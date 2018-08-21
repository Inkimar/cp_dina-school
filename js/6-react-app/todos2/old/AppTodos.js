import React from 'react'

import axios from 'axios'

export default class TodosList extends React.Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    axios.get(`http://localhost:4001/todos`).then(res => {
      const todos = res.data
      this.setState({ todos })
    })
  }

  render() {
    return (
      <ul>
        {this.state.todos.map(item => (
          <li>
            {item.todo}, ( {item.date} )
          </li>
        ))}
      </ul>
    )
  }
}
