import "../CSS/Todo.css";
import { DataContext } from "../DataContext";
//import { useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
//import React, { Component } from "react";
import React, { useState, useContext } from "react";

function Todo() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const [sortByChecked, setSortByChecked] = useState(false);

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Math.random(),
        value: userInput.trim(),
        done: false,
      };
      setList([...list, newItem]);
      setUserInput("");
    }
  };

  const deleteItem = (key) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);
  };

  const markAsDone = (index) => {
    const updatedList = [...list];
    updatedList[index].done = !updatedList[index].done;
    setList(updatedList);
  };

  const editItem = (index) => {
    const editedTodo = prompt('Edit the task:', list[index].value);
    if (editedTodo !== null && editedTodo.trim() !== '') {
      const updatedList = [...list];
      updatedList[index].value = editedTodo.trim();
      setList(updatedList);
    }
  };

  const clearTasks = () => {
    setList([]);
  };

  const handleSortByChecked = () => {
    setSortByChecked(!sortByChecked);
  };

  const sortedList = sortByChecked ? [...list].sort((a, b) => a.done - b.done) : list;

  return (
    <div>
      <div className="bodyTask">
        <div className="">
          <input
            className="addTask"
            type="text"
            placeholder="add task . . ."
            value={userInput}
            onChange={(e) => updateInput(e.target.value)}
          />
          <input
            className="addButton"
            type="button"
            value="ADD"
            onClick={addItem}
          />
          <input
            className="clearButton"
            type="button"
            value="CLEAR"
            onClick={clearTasks}
          />
          <select className="custom-select" onChange={handleSortByChecked}>
            <option value="">Sort by</option>
            <option value="checked">Sort by checked</option>
          </select>
        </div>

        <div className="taskList">
          <ul>
            {sortedList.map((item, index) => (
              <li key={index} className="eachTask">
                <div className="spanTask">
                  <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
                    {item.value}
                  </span>
                </div>
                <div className="btnContainer">
                  <input
                    className="doneButton"
                    type="button"
                    value="✔"
                    onClick={() => markAsDone(index)}
                  />
                  <input
                    className="doneButton"
                    type="button"
                    value="✎"
                    onClick={() => editItem(index)}
                  />
                  <input
                    className="doneButton"
                    type="button"
                    value="✖"
                    onClick={() => deleteItem(item.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;