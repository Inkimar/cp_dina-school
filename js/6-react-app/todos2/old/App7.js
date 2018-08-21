import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.state = { a: 'this is a', b: 'this is b' }
    this.update = this.update.bind(this)
  }
  update(e) {
    this.setState({
      a: this.a.value,
      b: this.b.value,
    })
  }
  render() {
    return (
      <div>
        <input
          ref={node => (this.a = node)}
          type="text"
          onChange={this.update}
        />{' '}
        {this.state.a}
        <hr />
        <input
          ref={node => (this.b = node)}
          type="text"
          onChange={this.update}
        />{' '}
        {this.state.b}
      </div>
    )
  }
}

export default App
