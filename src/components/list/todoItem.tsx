import type { TodoProps } from "../../types/todo.type";
import { Trash2 } from "lucide-react";

function TodoItem({ todo, onDelete, onUpdateCompleted }: TodoProps) {
    return (
        <div className="py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        onClick={onUpdateCompleted}
                        checked={todo.completed}
                    />
                    {todo.completed ? (
                        <span className="text-sm line-through">
                            {todo.text}
                        </span>
                    ) : (
                        <span className="text-sm">{todo.text}</span>
                    )}
                    <span
                        className={`badge badge-soft badge-sm ${
                            todo.priority === "high"
                                ? "badge-error"
                                : todo.priority === "medium"
                                ? "badge-warning"
                                : "badge-success"
                        }`}
                    >
                        {todo.priority}
                    </span>
                </div>
                <button
                    onClick={onDelete}
                    className="cursor-pointer p-2 rounded-full hover:bg-zinc-100/10"
                >
                    <Trash2 className="w-4 h-4" color="red" />
                </button>
            </div>
        </div>
    );
}

export default TodoItem;
