export type Priority = "low" | "medium" | "high";

export interface Todo {
    id?: string;
    text: string;
    completed?: boolean;
    priority: Priority;
}

export type TodoProps = {
    todo: Todo;
  onDelete: () => void;
    onUpdateCompleted: () => void;
};
