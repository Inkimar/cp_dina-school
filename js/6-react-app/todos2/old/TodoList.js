import React from 'react'

export default class TodoList extends React.Component {
  constructor() {
    super()
    this.state = {
      test: 'NRM',
      todos: [],
      planets: [],
    }
  }

  /*
  componentDidMount() {
    const urlTodos = 'http://localhost:4001/todos'
    fetch(urlTodos)
      .then(response => response.json())
      .then(data => this.setState({ todos: data }))
  }
*/

  componentDidMount() {
    let initialPlanets = []
    fetch('https://swapi.co/api/planets/')
      .then(response => {
        return response.json()
      })
      .then(data => {
        initialPlanets = data.results.map(planet => {
          return planet
        })
        console.log(initialPlanets)
        this.setState({
          planets: initialPlanets,
        })
      })
  }

  // https://reactjs.org/docs/lists-and-keys.html
  render() {
    console.log(this.state.todos)
    let planets = this.state.planets
    let optionItems = planets.map(planet => (
      <option key={planet.name}>{planet.name}</option>
    ))
    return (
      <div>
        <select>{optionItems}</select>
      </div>
    )
    /* return (
      <div>
        <h1>Welcome to TodoList {JSON.stringify(this.state.todos)} </h1>
        <h1>Planets {JSON.stringify(this.state.planets)} </h1>
      </div>
    )
    */
  }
}
