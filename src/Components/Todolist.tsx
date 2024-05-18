import React from "react";
import "./styles.css";

// Interface
import { Todo } from "../Interface/ModelInterface";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodo: Todo[];
  setCompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todolist: React.FC<Props> = ({ todos, setTodos, completedTodo, setCompletedTodo }) => {
  return (
    <div className="container">
      <Droppable droppableId="Todolist">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Active Tasks</span>
            {todos.map((todo, index) => {
              return (
                <SingleTodo
                  key={todo.id}
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
  
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => {
          return (
            <div
              className={`todos remove ${
                snapshot.isDraggingOver ? "dragremove" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos_heading">Completed Tasks</span>
              {completedTodo.map((todo, index) => {
                return (
                  <SingleTodo
                    key={todo.id}
                    index={index}
                    todo={todo}
                    todos={completedTodo}
                    setTodos={setCompletedTodo}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}

      </Droppable>
    </div>
  );
};

export default Todolist;
