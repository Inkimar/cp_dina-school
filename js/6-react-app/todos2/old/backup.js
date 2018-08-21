import React from 'react'
import './AppTodos.css'
//import { TodoForm } from './TodoForm'
import { AllTodos } from '../src/AllTodos'

// https://www.w3schools.com/howto/howto_css_contact_form.asp

const url = `http://localhost:4001/todos`

export default class TodosList extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'NRM',
      item: 'todo',
      date: 'date',
      done: false,
      todos: [],
      planets: [],
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, key) {
    console.log(event.target.value)
    this.setState({
      [key]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const test = {
      todo: this.state.item,
      date: this.state.date,
      done: this.state.done,
    }

    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(test),
    })
      .then(function(response) {
        return response.json()
      })
      .then(function(data) {})
  }

  /*
  componentDidMount() {
    let initialPlanets = []
    const urlTodos = 'http://localhost:4001/todos'
    const url = 'https://swapi.co/api/planets/?format=json'
    const url2 = 'https://swapi.co/api/planets/'
    fetch(url2)
      .then(response => {
        return response.json()
      })
      .then(data => {
        initialPlanets = data.results.map(planet => {
          return planet
          //return planet.climate
        })
        console.log(initialPlanets)
        this.setState({
          planets: initialPlanets,
        })
      })
  }
  */

  // fungerar detta  ? http://jasonjl.me/blog/2015/04/18/rendering-list-of-elements-in-react-with-jsx/
  componentDidMount() {
    const urlTodos = 'http://localhost:4001/todos'
    fetch(urlTodos)
      .then(response => response.json())
      .then(data => this.setState({ todos: data }))
  }

  render() {
    //return <TodoForm onChange={this.handleChange(event, 'item')} />

    return (
      /*
      <div class="container">
        <form onSubmit={this.handleSubmit}>
          <label for="item">Item</label>
          <input
            type="text"
            name="item"
            placeholder="Your item...in same file"
            onChange={event => this.handleChange(event, 'item')}
          />

          <label for="date">Date</label>
          <input
            type="text"
            name="date"
            placeholder="YYYY-MM-DD"
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
        <AllTodos state={this.state} />
      </div>
      */
      //<h1>hello</h1>

      /*
      <div>
        {' '}
        <AllTodos name={this.state.name} todos={this.state.todos} />
      </div>
*/
      <div>
        {' '}
        <AllTodos name={this.state.name} />
      </div>
    )
  }
}
