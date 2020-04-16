import React from "react";
import ToDoneItem from "./ToDoneItem";

export default function ToDonesContainer(props) {
  // store props in variable
  const todones = props.items;

  //  map through items i the aray and return list component
  const toDonesItems =
    props.items &&
    todones.map(el => {
      return (
        <ToDoneItem item={el} key={el.text} updateItem={props.updateItem} />
      );
    });
  return (
    <div className="todones-container">
      <h3>BACKLOG</h3>
      {toDonesItems}
    </div>
  );
}
