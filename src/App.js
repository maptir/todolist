import React, { Component } from 'react';
import './App.css';
import Header from './containers/Header';
import Content from './containers/Content';

class App extends Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('todos'))
    this.state = {
      text: '',
      todos: JSON.parse(localStorage.getItem('todos')) || []
    }
  }

  inputText = (input) => {
    this.setState({
      text: input.target.value
    })
  }

  addTodo = () => {
    if (this.state.text === "") return;
    const todo = {
      text: this.state.text
    }
    const todos = [...this.state.todos, todo];
    this.setState({
      todos: todos,
      text: ''
    })
    console.log(JSON.parse(localStorage.getItem('todos')));
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  removeTodo = (index) => () => {
    const todos = [...this.state.todos.slice(0, index), ...this.state.todos.slice(index + 1)];
    this.setState({
      todos: todos
    })
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Content inputText={this.inputText} text={this.state.text} addTodo={this.addTodo} />
        {
          this.state.todos.map((todo, index) => (
            <div className="todo-wrapper">
              <div className="todo">{todo.text}</div>
              <input className="input-checkout" type="checkbox" />
              <button className="remove-btn" onClick={this.removeTodo(index)}> x </button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default App;
