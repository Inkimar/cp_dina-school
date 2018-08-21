import React from 'react'

class TodoForm extends Component {
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
            onChange={event => this.handleChange(event, 'item')}
          />

          <label for="date">Date</label>
          <input
            type="text"
            name="date"
            placeholder="On Date..."
            onChange={event => this.handleChange(event, 'date')}
          />
          <label for="done">Done or Not Done</label>
          <input
            type="text"
            name="done"
            placeholder="false"
            disabled
            onChange={event => this.handleChange(event, 'done')}
          />
          <button type="submit">OK</button>
        </form>
      </div>
    )
  }
}

export default TodoForm
