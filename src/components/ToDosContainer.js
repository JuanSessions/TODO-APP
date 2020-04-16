import React, { Component } from "react";
import ToDoItem from "./ToDoItem";

export default class ToDosContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserInput: ""
    };
  }
  handleNewTodoItem = e => {
    this.setState({
      UserInput: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.UserInput.trim() !== "") {
      this.props.addItem(this.state.UserInput);
      this.setState({
        UserInput: ""
      });
    }
  };

  render() {
    const todos = this.props.items;

    const toDoItems =
      this.props.items &&
      todos.map(el => {
        return (
          <ToDoItem
            item={el}
            key={el.text}
            updateItem={this.props.updateItem}
          />
        );
      });

    return (
      <div className="todos-container">
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <label className="input-item">
            <input
              type="text"
              name="todo"
              value={this.state.UserInput}
              onChange={this.handleNewTodoItem}
            />
          </label>
          <input type="submit" className="btn" value="ADD" />
        </form>

        <div className="todos">
          <h3>TO DO</h3>
          {toDoItems}
        </div>
      </div>
    );
  }
}
