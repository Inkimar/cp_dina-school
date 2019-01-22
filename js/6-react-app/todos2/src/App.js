import React from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import CreateTodo from './CreateTodo'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeView: 'list',
      activeId: undefined,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.setActiveId = this.setActiveId.bind(this)
    this.setActiveView = this.setActiveView.bind(this)
  }

  setActiveId(id) {
    this.setState({ activeId: id })
  }

  setActiveView(view) {
    this.setState({ activeView: view })
  }

  handleClick(view, id) {
    this.setState({
      activeView: view,
      activeId: id,
    })
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

    const url = `http://localhost:4001/todos/${this.state.activeId}`

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
        this.setActiveView('list')
      })
  }

  render() {
    const { activeId, activeView } = this.state
    let currentView

    switch (activeView) {
      case 'list':
        currentView = <TodoList onClick={this.handleClick} />
        break
      case 'create':
        currentView = (
          <CreateTodo
            onClick={this.handleClick}
            setActiveView={this.setActiveView}
            setActiveId={this.setActiveId}
          />
        )
        break
      case 'update':
        currentView = (
          <TodoForm
            onClick={this.handleClick}
            onSubmit={this.handleUpdate}
            setActiveId={this.setActiveId}
            id={activeId}
          />
        )
        break
      default:
    }
    return <div>{currentView}</div>
  }
}
