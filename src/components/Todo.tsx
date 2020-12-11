import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Action } from "../redux";
import TodoEntity, { TodoStatus } from "../Todo";
import DatePicker from "./DatePicker";

function Todo() {
    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const { title, status, date, time } = (e.target as HTMLFormElement)
            .elements as any;
        const todo = new TodoEntity(
            title.value,
            new Date(`${date.value} ${time.value}`),
            status.value
        );
        const action = { ...new Action("TodoAdd", todo) };
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
                />

                <label htmlFor="status">Status</label>
                <select id="status" className="p-1 mt-2 mb-6 border rounded">
                    {Object.values(TodoStatus).map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    className="p-1 mt-2 mb-6 border rounded"
                />

                <label htmlFor="time">Time</label>
                <input
                    type="time"
                    id="time"
                    className="p-1 mt-2 mb-6 border rounded"
                />

                <DatePicker
                    value={new Date()}
                    handleChange={() => {}}
                ></DatePicker>

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
