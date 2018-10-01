import React from 'react'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inUpdate: false,
      inDelete: false,
      inCreate: false,
      inList: true,
      activeId: null,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.setActiveId = this.setActiveId.bind(this)
  }

  setActiveId(id) {
    this.setState({ activeId: id })
  }

  handleClick(key, id) {
    if (key === 'delete') {
      this.setState({
        inDelete: true,
        inUpdate: false,
        inCreate: false,
        inList: false,
        activeId: id,
      })
    } else if (key === 'update') {
      this.setState({
        inDelete: false,
        inUpdate: true,
        inCreate: false,
        inList: false,
        activeId: id,
      })
    } else if (key === 'create') {
      this.setState({
        inDelete: false,
        inUpdate: false,
        inCreate: true,
        inList: false,
        activeId: id,
      })
    } else if (key === 'list') {
      this.setState({
        inDelete: false,
        inUpdate: false,
        inCreate: false,
        inList: true,
        activeId: id,
      })
    }
    // alert('Main: you pressed ' + key)
  }

  handleCreate(event, todo) {
    event.preventDefault()

    fetch('http://localhost:4001/todos', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
      .then(response => {
        //  console.log('Response is ', response)
        if (response.status >= 400) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(() => {
        this.setState({
          inList: true,
        })
      })
      .catch(error => {
        // console.error('something went wrong .... ', error)
        //  alert(error)
      })
  }

  /* from postman
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
    }).then(response => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      this.handleClick('list')
      return response.json()
    })
    /*
      .then(() => {
        this.props.onClick('list')
      })
      .catch(error => {
        console.error('something went wrong .... ', error)
        alert(error)
      })
      */
  }

  // conditional rendering : https://reactjs.org/docs/conditional-rendering.html
  render() {
    let view
    if (this.state.inList) {
      view = <TodoList onClick={this.handleClick} />
    } else if (this.state.inCreate) {
      view = (
        <TodoForm
          onClick={this.handleClick}
          onSubmit={this.handleCreate}
          setActiveId={this.setActiveId}
        />
      )
    } else if (this.state.inUpdate) {
      view = (
        <TodoForm
          onClick={this.handleClick}
          onSubmit={this.handleUpdate}
          setActiveId={this.setActiveId}
          id={this.state.activeId}
        />
      )
    }
    return <div>{view}</div>
  }
}
