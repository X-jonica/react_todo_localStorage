import type { Todo } from "../types/todo.type";

export const saveTodo = (todos: Todo[]): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
