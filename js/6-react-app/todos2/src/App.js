import React from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeView: 'list',
      activeId: undefined,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.setActiveId = this.setActiveId.bind(this)
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

  handleCreate(event, todo) {
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
        this.setActiveView('list')
      })
    /*
      .catch(error => {
          console.error('something went wrong .... ', error)
      })
    */
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

  // conditional rendering : https://reactjs.org/docs/conditional-rendering.html
  render() {
    let currentView

    if (this.state.activeView === 'list') {
      currentView = <TodoList onClick={this.handleClick} />
    } else if (this.state.activeView === 'create') {
      currentView = (
        <TodoForm
          onClick={this.handleClick}
          onSubmit={this.handleCreate}
          setActiveId={this.setActiveId}
        />
      )
    } else if (this.state.activeView === 'update') {
      currentView = (
        <TodoForm
          onClick={this.handleClick}
          onSubmit={this.handleUpdate}
          setActiveId={this.setActiveId}
          id={this.state.activeId}
        />
      )
    }

    return <div>{currentView}</div>
  }
}
