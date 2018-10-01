import React from 'react'
import './AppTodos.css'
// https://www.w3schools.com/howto/howto_css_contact_form.asp

const url = `http://localhost:4001/todos`

export default class TodosList extends React.Component {
  constructor() {
    super()
    this.state = { a: 'todo', b: 'date', c: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      a: this.a.value,
      b: this.b.value,
      c: this.c.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const test = {
      todo: this.state.a,
      date: this.state.b,
      done: this.state.c,
    }

    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test),
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {
        this.state.a = ''
      })
  } //handlesubmit

  render() {
    return (
      <div class="container">
        <form onSubmit={this.handleSubmit}>
          <label for="item">Item</label>
          <input
            ref={node => (this.a = node)}
            type="text"
            name="item"
            placeholder="Your item..."
            onChange={this.handleChange}
          />

          <label for="date">Date</label>
          <input
            ref={node => (this.b = node)}
            type="text"
            name="date"
            placeholder="On Date..."
            onChange={this.handleChange}
          />
          <label for="done">Done or Not Done</label>
          <input
            ref={node => (this.c = node)}
            type="text"
            name="done"
            placeholder="true or false"
            onChange={this.handleChange}
          />
          <button type="submit">OK</button>
        </form>
      </div>
    )
  }
}
