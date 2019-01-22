import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'

const propTypes = {
  onClick: PropTypes.func.isRequired,
  setActiveId: PropTypes.func.isRequired,
  setActiveView: PropTypes.func.isRequired,
}

export default class CreateTodo extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event, todo) {
    event.preventDefault()

    fetch('http://localhost:4001/todos', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(() => {
        this.props.setActiveView('list')
      })
  }
  render() {
    return (
      <TodoForm
        onClick={this.props.onClick}
        onSubmit={this.handleSubmit}
        setActiveId={this.props.setActiveId}
      />
    )
  }
}
CreateTodo.propTypes = propTypes
