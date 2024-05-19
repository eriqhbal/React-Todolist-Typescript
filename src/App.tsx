import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";

// Interface
import { Todo } from "./Interface/ModelInterface";

// Components
import { InputField, Todolist } from "./Components";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    if (todo) {
      const newData = { id: Date.now(), todo: todo, isDone: false };
      setTodos([...todos, newData]);
      setTodo("");
    }
  }

  function onDragEnd(result: DropResult) {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodo;

    if (source.droppableId === "Todolist") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "Todolist") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodo(complete);
    setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Typescript Todo</span>
        <InputField todo={todo} setTodo={setTodo} add={handleAdd} />
        <Todolist
          todos={todos}
          setTodos={setTodos}
          completedTodo={completedTodo}
          setCompletedTodo={setCompletedTodo}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
