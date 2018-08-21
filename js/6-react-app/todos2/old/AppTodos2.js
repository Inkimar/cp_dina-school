import React from 'react'

//import axios from 'axios'

const url = `http://localhost:4001/todos`

export default class TodosList extends React.Component {
  state = {
    todo: 'testing',
    date: '2018-09-09',
    done: false,
  }

  handleChange = event => {
    this.setState({ todo: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('submitting')
    const test = {
      todo: 'test',
      done: true,
      date: '2018-08-24',
    }

    fetch('http://localhost:4001/todos', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test),
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        console.log('create an Item' + test)
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Item To Do:
            <input type="text" name="todo" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}
