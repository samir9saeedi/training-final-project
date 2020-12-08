import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Action, State } from "../redux";
import { TodoStatus } from "../Todo";
import { getWeek } from "date-fns";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function getTime(date: Date) {
    let hours: any = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const suffix = hours < 12 ? "am" : "pm";
    hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    hours = hours.toString().padStart(2, "0");
    return `${hours}:${minutes} ${suffix}`;
}

function Todos() {
    let todos = useSelector((state: State) => state.todos);
    let titleSortDir = useSelector((state: State) => state.titleSortDir);
    const dispatch = useDispatch();
    const { done, range } = useParams<{
        done: "to-do" | "done-tasks";
        range: "month" | "week" | "day";
    }>();
    todos = todos.filter((o) =>
        done === "done-tasks"
            ? o.status === TodoStatus.Done
            : o.status !== TodoStatus.Done
    );

    function handleRemove(id: string) {
        const action = { ...new Action("TodoRemove", id) };
        dispatch(action);
    }

    function handleCheck(id: string) {
        const action = { ...new Action("TodoDone", id) };
        dispatch(action);
    }

    function handleTitleSort() {
        const action = { ...new Action("ToggleTitleSortDir") };
        dispatch(action);
    }

    const now = new Date();
    switch (range) {
        case "day":
            todos = todos.filter(
                (o) =>
                    o.date.getFullYear() === now.getFullYear() &&
                    o.date.getMonth() === now.getMonth() &&
                    o.date.getDate() === now.getDate()
            );
            break;
        case "week":
            const currentWeek = getWeek(now, { weekStartsOn: 1 });
            todos = todos.filter(
                (o) => getWeek(o.date, { weekStartsOn: 1 }) === currentWeek
            );
            break;
        case "month":
            todos = todos.filter(
                (o) =>
                    o.date.getFullYear() === now.getFullYear() &&
                    o.date.getMonth() === now.getMonth()
            );
            break;
    }

    return (
        <div className="relative text-sm">
            <Link
                className="absolute top-0 right-0 flex items-center block px-3 py-0.5 text-gray-200 bg-blue-500 rounded"
                to="/todo"
            >
                <span className="mr-3 text-3xl">+</span>
                Add Task
            </Link>

            <div className="flex pt-6 text-xs border-b">
                <Link
                    className={`relative flex items-center justify-center w-32 h-10 py-2 text-center border rounded-t top-px ${
                        done === "to-do"
                            ? "border-b-0 text-blue-600 bg-white font-bold"
                            : "text-gray-400 bg-gray-100"
                    }`}
                    to={`/todos/to-do/${range}`}
                >
                    To Do
                </Link>
                <Link
                    className={`relative flex items-center justify-center w-32 h-10 py-2 ml-1 text-center border rounded-t top-px ${
                        done === "done-tasks"
                            ? "border-b-0 text-blue-600 bg-white font-bold"
                            : "text-gray-400 bg-gray-100"
                    }`}
                    to={`/todos/done-tasks/${range}`}
                >
                    Done Tasks
                </Link>
            </div>

            <div className="flex justify-end mt-8 text-xs">
                <Link
                    className={`px-5 py-2 border rounded-l box-content ${
                        range === "month" ? "text-blue-600" : "text-gray-700"
                    }`}
                    to={`/todos/${done}/month`}
                >
                    Month
                </Link>
                <Link
                    className={`px-5 py-2 border-t border-b box-content ${
                        range === "week" ? "text-blue-600" : "text-gray-700"
                    }`}
                    to={`/todos/${done}/week`}
                >
                    Week
                </Link>
                <Link
                    className={`px-5 py-2 border rounded-r box-content ${
                        range === "day" ? "text-blue-600" : "text-gray-700"
                    }`}
                    to={`/todos/${done}/day`}
                >
                    Day
                </Link>
            </div>

            <table className="w-full mt-10">
                <thead className="text-left text-gray-500">
                    <tr className="border-t border-b">
                        {done === "to-do" && <th>&nbsp;</th>}
                        <th className="py-4">
                            <button
                                className="font-bold"
                                onClick={handleTitleSort}
                            >
                                Tasks
                            </button>
                        </th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todos
                        .sort(function (a, b) {
                            console.log(titleSortDir);
                            if(titleSortDir === null) return 0;

                            // ignore upper and lowercase
                            var titleA = a.title.toUpperCase();
                            var titleB = b.title.toUpperCase();

                            if (titleA < titleB)
                                return titleSortDir === "asc" ? -1 : 1;
                            if (titleA > titleB)
                                return titleSortDir === "asc" ? 1 : -1;
                            return 0;
                        })
                        .map((o) => (
                            <tr className="font-bold" key={o.id}>
                                {done === "to-do" && (
                                    <td>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheck(o.id)}
                                        />
                                    </td>
                                )}
                                <td className="py-8">{o.title}</td>
                                <td>
                                    <span
                                        className={`text-white rounded-full px-4 py-2 ${
                                            o.status === TodoStatus.Done
                                                ? "bg-green-600"
                                                : o.status ===
                                                  TodoStatus.InProgress
                                                ? "bg-blue-600"
                                                : "bg-yellow-500"
                                        }`}
                                    >
                                        {o.status}
                                    </span>
                                </td>
                                <td>{`${o.date.getDate()} ${
                                    months[o.date.getMonth()]
                                } ${o.date.getFullYear()}`}</td>
                                <td>{getTime(o.date)}</td>
                                <td>
                                    <div className="flex items-center">
                                        <a className="text-blue-500" href="/">
                                            <svg
                                                fill="currentColor"
                                                className="w-4 h-4 currentColor"
                                                viewBox="0 0 20.517 20.517"
                                            >
                                                <path
                                                    d="M19.976,5.767,18.128,7.614a.481.481,0,0,1-.681,0L13,3.166a.481.481,0,0,1,0-.681L14.846.637a1.928,1.928,0,0,1,2.721,0l2.408,2.408A1.92,1.92,0,0,1,19.976,5.767Zm-8.564-1.7L.888,14.595l-.85,4.869a.963.963,0,0,0,1.114,1.114l4.869-.854L16.545,9.2a.481.481,0,0,0,0-.681L12.1,4.071a.486.486,0,0,0-.685,0ZM3.549,17.064H5.473v1.455l-2.585.453L1.642,17.725l.453-2.585H3.549Z"
                                                    transform="translate(-0.024 -0.075)"
                                                />
                                            </svg>
                                        </a>
                                        <button
                                            className="ml-3 text-red-500"
                                            onClick={() => handleRemove(o.id)}
                                        >
                                            <svg
                                                fill="currentColor"
                                                className="w-8 h-8 currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Todos;
