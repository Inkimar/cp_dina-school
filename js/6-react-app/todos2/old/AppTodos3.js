import React from 'react'

//import axios from 'axios'

const url = `http://localhost:4001/todos`

export default class TodosList extends React.Component {
  constructor() {
    super()
    this.state = { a: 'test a', b: 'test b' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      a: this.a.value,
      b: this.b.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('submitting')
    /*
    const test = {
      todo: 'test',
      done: true,
      date: '2018-08-24',
    }
    */
    const test = {
      todo: this.state.a,
      date: this.state.b,
      done: false,
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
            <input
              ref={node => (this.a = node)}
              type="text"
              onChange={this.handleChange}
            />{' '}
            {this.state.a}
          </label>
          <hr />
          <label>
            Date:
            <input
              ref={node => (this.b = node)}
              type="text"
              onChange={this.handleChange}
            />{' '}
            {this.state.b}
          </label>
          <button type="submit">OK</button>
        </form>
      </div>
    )
  }
}
