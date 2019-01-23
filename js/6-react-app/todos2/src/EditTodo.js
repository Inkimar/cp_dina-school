import React from 'react'
import PropTypes from 'prop-types'
import TodoForm from './TodoForm'

const propTypes = {
  onClick: PropTypes.func.isRequired,
  setActiveId: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setActiveView: PropTypes.func.isRequired,
}

export default class EditTodo extends React.Component {
  constructor(props) {
    super(props)

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    console.log('in EditTodo, component did mount ', this.props.id)
  }

  /* Usage from postman
  {
    "id": 2,
    "done": false,
    "todo": "run 42.2km",
    "date": "2018-08-25"
  }
  */
  handleUpdate(event, todo) {
    event.preventDefault()
    const { id } = this.props
    console.log('EditTodo, handleUpdate, ', id)
    const url = `http://localhost:4001/todos/${id}`

    fetch(url, {
      method: 'put',
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
        console.log('pushing the active view .... ')
        this.props.setActiveView('list')
      })
  }

  render() {
    return (
      <TodoForm
        onClick={this.props.onClick}
        onSubmit={this.handleUpdate}
        setActiveId={this.props.setActiveId}
        id={this.props.id}
      />
    )
  }
}
EditTodo.propTypes = propTypes
