import {setDate, setHours, setMinutes, setMonth, setYear} from "date-fns";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Action } from "../redux";
import TodoEntity, { TodoStatus } from "../Todo";
import DatePicker from "./DatePicker";

function Todo() {
    const dispatch = useDispatch();
    const history = useHistory();
    const todo = new TodoEntity("Todo", new Date(), TodoStatus.InProgress);
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
        const date = setYear(setMonth(setDate(model.date, e.getDate()), e.getMonth()), e.getFullYear());
        setModel({ ...model, date });
    }

    function handleTimeChange(e: ChangeEvent<HTMLInputElement>) {
        const timeParts = e.target.value.split(":");
        const date = setHours(setMinutes(model.date, Number(timeParts[1] || "")), Number(timeParts[0]));
        setModel({ ...model, date});
    }


    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const action = { ...new Action("TodoAdd", model) };
        dispatch(action);
        history.push("/todos/to-do/month");
    }

    return (
        <form onSubmit={handleSubmit} className="border rounded">
            <fieldset className="relative flex flex-col p-6 w-36">
                <legend className="absolute px-2 text-2xl bg-white -top-4">
                    Todo
                </legend>

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    className="p-1 mt-2 mb-6 border rounded"
                    value={model.title}
                    onChange={handleTitleChange}
                />

                <label htmlFor="status">Status</label>
                <select
                    value={model.status}
                    onChange={handleStatusChange}
                    id="status"
                    className="p-1 mt-2 mb-6 border rounded"
                >
                    {Object.values(TodoStatus).map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>

                <label htmlFor="date">Date</label>
                <DatePicker
                    className="p-1 mt-2 mb-6 border rounded"
                    value={model.date}
                    handleChange={handleDateChange}
                ></DatePicker>

                <label htmlFor="time">Time</label>
                <input
                    type="time"
                    id="time"
                    value={`${model.date.getHours().toString().padStart(2, "0")}:${model.date.getMinutes().toString().padStart(2, "0")}`}
                    onChange={handleTimeChange}
                    required
                    className="p-1 mt-2 mb-6 border rounded"
                />

                <button
                    className="p-1 text-white bg-green-600 border rounded"
                    type="submit"
                >
                    Save
                </button>
            </fieldset>
        </form>
    );
}

export default Todo;
