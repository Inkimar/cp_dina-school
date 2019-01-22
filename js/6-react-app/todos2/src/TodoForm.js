import React from 'react'
import PropTypes from 'prop-types'
import './AppTodos.css'

const propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setActiveId: PropTypes.func.isRequired,
}

const defaultProps = {
  id: undefined,
}

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props)

    // läsa på om uncontrolled vs controlled input
    this.state = {
      name: '',
      date: '',
      done: false,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  // läsa på om componentDidMount vs componentWillMount
  componentDidMount() {
    if (this.props.id) {
      this.fetchTodo(this.props.id) // fetching from backend
    }
  }

  componentWillUnmount() {
    this.props.setActiveId(null)
  }

  fetchTodo(id) {
    fetch(`http://localhost:4001/todos/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          // spread-operatorn
          ...data,
        })
      })
  }

  handleChange(event, key) {
    this.setState({
      [key]: event.target.value,
    })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.props.onSubmit(event, this.state)}>
          <label>Item</label>
          <input
            type="text"
            name="item"
            placeholder="Your item..."
            value={this.state.name}
            onChange={event => this.handleChange(event, 'name')}
          />
          <label>Date</label>
          <input
            type="text"
            name="date"
            placeholder="YYYY-MM-DD"
            value={this.state.date}
            onChange={event => this.handleChange(event, 'date')}
          />
          <label>Done or Not Done</label>
          <input
            type="text"
            name="done"
            placeholder="false"
            disabled={!this.props.id}
            value={this.state.done}
            onChange={event => this.handleChange(event, 'done')}
          />
          <button type="submit">Ok</button>
          <button type="button" onClick={() => this.props.onClick('list')}>
            Cancel
          </button>
        </form>
      </div>
    )
  }
}
TodoForm.propTypes = propTypes
TodoForm.defaultProps = defaultProps
