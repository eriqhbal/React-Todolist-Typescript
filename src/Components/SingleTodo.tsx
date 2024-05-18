import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";

// Import Interface
import { Todo } from "../Interface/ModelInterface";

// Import icons
import { MdDelete, MdDone, MdEdit } from "react-icons/md";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodos, setEditTodos] = useState<string>(todo.todo);
  const autoTypeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    autoTypeRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, isDone: !todo.isDone } : t))
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  }

  function handleEdit() {
    if(!edit && !todo.isDone) {
      setEdit(!edit);
    }
  }

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map(t => t.id === id ? {...t, todo: editTodos} : t))

    setEdit(false);
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos_single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={autoTypeRef}
              value={editTodos}
              onChange={(e) => setEditTodos(e.target.value)}
              className="todos_single--text"
            />
          ) : todo.isDone ? (
            <s className="todos_single--text">{todo.todo}</s>
          ) : (
            <label className="todos_single--text">{todo.todo}</label>
          )}

          <div className="">
            <span className="icon" onClick={handleEdit} role="button">
              <MdEdit />
            </span>
            <span
              className="icon"
              role="button"
              onClick={() => handleDelete(todo.id)}
            >
              <MdDelete />
            </span>
            <span
              className="icon"
              onClick={() => handleDone(todo.id)}
              role="button"
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
