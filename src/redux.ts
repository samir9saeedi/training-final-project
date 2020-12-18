import { createStore } from "redux";
import Todo, { TodoStatus } from "./Todo";

export type State = { todos: Array<Todo>, titleSortDir: string | null };

const initialState: State = {
    todos: [
        new Todo("Task #1", new Date(2020, 11, 21, 9, 30), TodoStatus.Paused),
        new Todo(
            "Task #5",
            new Date(2020, 11, 9, 11, 0),
            TodoStatus.InProgress
        ),
        new Todo(
            "Task #3",
            new Date(2020, 11, 8, 17, 30),
            TodoStatus.InProgress
        ),
        new Todo("Task #4", new Date(2020, 11, 9, 19, 30), TodoStatus.Done),
    ],
    titleSortDir: null,
};

export const store = createStore(
    reducer,
    initialState,
    //@ts-ignore
    window.devToolsExtension && window.devToolsExtension()
);

export type ActionType = "TodoAdd" | "TodoEdit" | "TodoRemove" | "TodoDone" | "ToggleTitleSortDir";

export class Action {
    constructor(public type: ActionType, public payload?: any) {}
}

function reducer(state = initialState, { type, payload }: Action) {
    switch (type) {
        case "TodoAdd":
            return {
                ...state,
                todos: [...state.todos, payload],
            };
        case "TodoEdit":
            return {
                ...state,
                todos: [...state.todos.filter((o) => o.id !== payload.id), payload],
            };
        case "TodoRemove":
            return {
                ...state,
                todos: state.todos.filter((o) => o.id !== payload),
            };
        case "TodoDone":
            return {
                ...state,
                todos: state.todos.map((o) => {
                    if (o.id !== payload) return o;
                    o.status = TodoStatus.Done;
                    return o;
                }),
            };
        case "ToggleTitleSortDir":
            return {
                ...state,
                titleSortDir: (state.titleSortDir === null || state.titleSortDir === "desc") ? "asc" : "desc",
            }
        default:
            return state;
    }
}
