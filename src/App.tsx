import { useEffect, useState } from "react";
import type { Priority, Todo } from "./types/todo.type";
import { AlertSuccessMessage } from "./components/commons/alert";
import { saveTodo } from "./service/todo.service";
import TodoItem from "./components/list/todoItem";
import { HatGlasses } from "lucide-react";

function App() {
    const [text, setText] = useState<string>("");
    const [priority, setPriority] = useState<Priority>("low");

    // Ckeck and Initialize todos from localStorage
    const getTodos = localStorage.getItem("todos");
    const initialTodos: Todo[] = getTodos ? JSON.parse(getTodos) : [];
    const [todos, setTodos] = useState<Todo[]>(initialTodos);
    const [message, setMessage] = useState<string>("");
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [filterByPriority, setFilterByPriority] = useState<Priority | "All">(
        "All"
    );
    const [filterByCompleted, setFilterByCompleted] = useState<string>("All");
    const [search, setSearch] = useState<string>("");

    // Save todos to localStorage whenever todos state changes
    useEffect(() => {
        saveTodo(todos);
    }, [todos]);

    // Function to add a new todo
    const addTodo = (e: React.FormEvent) => {
        try {
            e.preventDefault();
            if (text.trim().length === 0) {
                setMessage("Task description cannot be empty!");
                setTimeout(() => setMessage(""), 3000);
                return;
            }

            const newTask = {
                id: Date.now().toString(),
                text: text,
                priority: priority,
                completed: false,
            };

            const newTodos = [...todos, newTask];
            setTodos(newTodos);

            setStatusMessage("Task added successfully!");
            setTimeout(() => setStatusMessage(""), 3000);
            setMessage("");
            setText("");
            setPriority("low");
            console.log(newTodos);
        } catch (error) {
            console.log("Tak add error ! ", error);
            setStatusMessage("Task added error!");
            setTimeout(() => setStatusMessage(""), 3000);
        }
    };

    // Filter todos based on priority
    let filteredTodosByPriority: Todo[] = [];

    if (filterByPriority === "All") {
        filteredTodosByPriority = todos;
    } else {
        filteredTodosByPriority = todos.filter(
            (todo) => todo.priority === filterByPriority
        );
    }

    // Further filter todos based on completion status
    let filteredTodos: Todo[] = [];
    if (filterByCompleted === "All") {
        filteredTodos = filteredTodosByPriority;
    } else if (filterByCompleted === "completed") {
        filteredTodos = filteredTodosByPriority.filter(
            (todo) => todo.completed
        );
    } else {
        filteredTodos = filteredTodosByPriority.filter(
            (todo) => !todo.completed
        );
    }

    // Reasult Search
    if (search.trim().length > 0) {
        filteredTodos = filteredTodos.filter((todo) =>
            todo.text?.toLowerCase().includes(search.toLowerCase())
        );
    }

    // count each value of priority
    const countPriorityLow = todos.filter((t) => t.priority === "low").length;
    const countPriorityMedium = todos.filter(
        (t) => t.priority === "medium"
    ).length;
    const countPriorityHigh = todos.filter((t) => t.priority === "high").length;
    const countCompleted = todos.filter((t) => t.completed).length;
    const countNotCompleted = todos.filter((t) => !t.completed).length;
    const countAll = todos.length;

    // Function to delete a todo
    const handleDeleteTodo = (id: string) => {
        try {
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            if (window.confirm("Are you sure you want to delete this task?")) {
                setTodos(updatedTodos);
                setStatusMessage("Task deleted successfully!");
                setTimeout(() => setStatusMessage(""), 3000);
            }
        } catch (error) {
            console.log("task not deleted", error);
            setStatusMessage("Error deleting task !");
        }
    };

    // Function to update completed status of a todo
    const updateCompletedTodo = (id: string) => {
        if (
            window.confirm("Are you sure to change the status of this task ?")
        ) {
            const updatedTodos = todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            setTodos(updatedTodos);
        }
    };
    return (
        <>
            <div className="absolute top-4 right-4 ">
                <select
                    className="select"
                    onChange={(e) =>
                        document.documentElement.setAttribute(
                            "data-theme",
                            e.target.value
                        )
                    }
                >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </div>
            <div className="w-full px-4 h-screen flex justify-center items-center md:px-10 lg:px-20">
                {/* Form */}
                <div className="w-full flex flex-col gap-4 my-5 bg-base-300 p-5 rounded-lg shadow-sm ">
                    <div className="flex gap-2 ">
                        <div className="w-full flex flex-col gap-2">
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Add your task description here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <p className="text-sm text-error">{message}</p>
                        </div>
                        <select
                            className="select w-full"
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value as Priority)
                            }
                        >
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                        <button className="btn btn-primary" onClick={addTodo}>
                            Add
                        </button>
                    </div>

                    {/* Filter button */}
                    <div className="space-y-2 flex-1 h-fit">
                        <div className="flex flex-wrap gap-4">
                            <button
                                className={`btn btn-soft ${
                                    filterByPriority === "All"
                                        ? "btn-primary"
                                        : ""
                                }`}
                                onClick={() => setFilterByPriority("All")}
                            >
                                Tous ({countAll})
                            </button>
                            <button
                                className={`btn btn-soft ${
                                    filterByPriority === "low"
                                        ? "btn-primary"
                                        : ""
                                }`}
                                onClick={() => setFilterByPriority("low")}
                            >
                                Low ({countPriorityLow})
                            </button>
                            <button
                                className={`btn btn-soft ${
                                    filterByPriority === "medium"
                                        ? "btn-primary"
                                        : ""
                                }`}
                                onClick={() => setFilterByPriority("medium")}
                            >
                                Medium ({countPriorityMedium})
                            </button>
                            <button
                                className={`btn btn-soft ${
                                    filterByPriority === "high"
                                        ? "btn-primary"
                                        : ""
                                }`}
                                onClick={() => setFilterByPriority("high")}
                            >
                                High ({countPriorityHigh})
                            </button>
                            <select
                                className="select"
                                value={filterByCompleted}
                                onChange={(e) =>
                                    setFilterByCompleted(e.target.value)
                                }
                            >
                                <option value="All">Filter by status</option>
                                <option value="completed">
                                    Completed ({countCompleted})
                                </option>
                                <option value="not-completed">
                                    Not completed ({countNotCompleted})
                                </option>
                            </select>
                            <input
                                type="text"
                                className="flex-1 input"
                                placeholder="You can Search your task here ..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Data */}
                    {filteredTodos.length > 0 ? (
                        <div>
                            <ul className="divide-y devide-gray-300">
                                {filteredTodos.map((todo) => (
                                    <li key={todo.id}>
                                        <TodoItem
                                            todo={todo}
                                            onDelete={() =>
                                                handleDeleteTodo(
                                                    todo.id as string
                                                )
                                            }
                                            onUpdateCompleted={() =>
                                                updateCompletedTodo(
                                                    todo.id as string
                                                )
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center gap-2 p-4 ">
                            <HatGlasses className="w-8 h-8" />
                            <p className="text-xl font-semibold text-center">
                                No todo found at this time !
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Notification methode */}
            <div className="absolute bottom-4 right-4">
                {statusMessage.trim().length > 0 && (
                    <AlertSuccessMessage message={statusMessage} />
                )}
            </div>
        </>
    );
}

export default App;
