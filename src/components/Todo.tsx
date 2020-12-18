import { setDate, setHours, setMinutes, setMonth, setYear } from "date-fns";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Action, State } from "../redux";
import TodoEntity, { TodoStatus } from "../Todo";
import DatePicker from "./DatePicker";

function Todo() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams<{ id?: string }>();
    const todos = useSelector((state: State) => state.todos);
    const todo =
        (id && todos.find((o) => o.id === id)) ||
        new TodoEntity("", new Date(), TodoStatus.InProgress);
    const [model, setModel] = useState(todo);

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setModel({ ...model, title: e.target.value });
    }

    function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
        setModel({
            ...model,
            status: TodoStatus[e.target.value as keyof typeof TodoStatus],
        });
    }

    function handleDateChange(e: Date) {
        const date = setYear(
            setMonth(setDate(model.date, e.getDate()), e.getMonth()),
            e.getFullYear()
        );
        setModel({ ...model, date });
    }

    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        const timeParts = e.target.value.split(":");
        const date = setHours(
            setMinutes(model.date, Number(timeParts[1] || "")),
            Number(timeParts[0])
        );
        setModel({ ...model, date });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const action = { ...new Action(model.id === id ? "TodoEdit": "TodoAdd", model) };
        dispatch(action);
        history.push("/todos/to-do/month");
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="relative gap-12 grid sm:grid-cols-2 md:grid-cols-4">
                <legend className="mb-8 text-2xl">Todo</legend>

                <div className="flex flex-col">
                    <label htmlFor="title">Title</label>

                    <input
                        type="text"
                        id="title"
                        className="p-1 mt-2 border rounded"
                        value={model.title}
                        onChange={handleTitleChange}
                        autoFocus
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="status">Status</label>

                    <select
                        value={model.status}
                        onChange={handleStatusChange}
                        id="status"
                        className="p-1 mt-2 border rounded"
                    >
                        {Object.values(TodoStatus).map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="date">Date</label>

                    <DatePicker
                        className="p-1 mt-2 border rounded"
                        value={model.date}
                        handleChange={handleDateChange}
                    ></DatePicker>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="time">Time</label>

                    <input
                        type="time"
                        id="time"
                        value={`${model.date
                            .getHours()
                            .toString()
                            .padStart(
                                2,
                                "0"
                            )}:${model.date
                            .getMinutes()
                            .toString()
                            .padStart(2, "0")}`}
                        onChange={handleTimeChange}
                        required
                        className="p-1 mt-2 border rounded"
                    />
                </div>
            </fieldset>

            <button
                className="w-24 p-2 mt-8 text-white bg-green-600 border rounded"
                type="submit"
            >
                Save
            </button>
        </form>
    );
}

export default Todo;
