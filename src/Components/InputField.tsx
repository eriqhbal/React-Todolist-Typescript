import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  add(e: React.FormEvent): void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, add }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        add(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="input_box"
        placeholder="Enter a Task"
      />
      <button type="submit" className="input_submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
