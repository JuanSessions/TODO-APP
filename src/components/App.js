import React, { Component } from "react";
import "../css/App.scss";
import Navigation from "./Navigation";
import ToDosContainer from "./ToDosContainer";
import ToDonesContainer from "./ToDonesContainer";
import { HashRouter, Switch, Route } from "react-router-dom"
import Help from "../views/Help"
import PageNotFound from "../views/PageNotFound";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  //fetch data from local storage
  componentDidMount() {
    let data = localStorage.getItem("todo-list");
    let dataFromLocalStorage = JSON.parse(data);
    // checking null value in local storage
    if (dataFromLocalStorage !== null) {
      this.setState({ items: dataFromLocalStorage });
    }
  }

  updateItem = id => {
    let newState = this.state.items.map(item => {
      if (item.id === id) {
        item.done = !item.done;
        return item;
      } else {
        return item;
      }
    });
    this.setState(
      {
        items: newState
      },
      () => {
        // storing data into localStorage
        localStorage.setItem("todo-list", JSON.stringify(this.state.items)); //method setItem with key and value
      }
    );
  };

  addItem = newItem => {
    let item = {
      id: this.state.items.length,
      text: newItem,
      done: false
    };
    this.setState(
      {
        items: [...this.state.items, item]
      },
      () => {
        // setting data into localStorage
        localStorage.setItem("todo-list", JSON.stringify(this.state.items)); //method setItem with key and value
      }
    );
  };

  render() {
    const toDos = this.state.items && this.state.items.filter(el => !el.done); //not done
    const toDones = this.state.items && this.state.items.filter(el => el.done);

    return (

      <HashRouter>

        <div className="app">

          <Navigation />

          <Switch>
            <Route path="/" exact>
              <ToDosContainer
                items={toDos}
                updateItem={this.updateItem}
                addItem={this.addItem}
              />

              <ToDonesContainer items={toDones} updateItem={this.updateItem} />
            </Route>
            <Route path="/help" exact>
              <Help />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
