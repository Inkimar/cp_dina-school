import React from 'react'
import axios from 'axios'

const API = 'http://localhost:4001/'
const DEFAULT_QUERY = 'todos'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    }
    this.update = this.update.bind(this)
  }
  update(e) {}

  componentDidMount() {
    this.setState({ isLoading: true })

    axios
      .get(API + DEFAULT_QUERY)
      .then(result =>
        this.setState({
          hits: result.data.hits,
          isLoading: false,
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      )
  }
  /*
  componentDidMount() {
    fetch('http://localhost:4001/todos')
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }))
  }
  */
  render() {
    // return this.state.Component || 'unknown'
    return this.state.hits
  }
}

export default App
