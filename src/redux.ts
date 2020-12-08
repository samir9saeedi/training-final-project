import { createStore } from "redux";
import Todo, { TodoStatus } from "./Todo";

export type State = { todos: Array<Todo> };

const initialState: State = {
    todos: [
        new Todo("Task #1", new Date(2020, 11, 21, 9, 30), TodoStatus.Paused),
        new Todo(
            "Task #2",
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
};

export const store = createStore(
    reducer,
    initialState,
    //@ts-ignore
    window.devToolsExtension && window.devToolsExtension()
);

export type ActionType = "TodoAdd" | "TodoRemove";

export class Action {
    constructor(public type: ActionType, public payload: any) {}
}

function reducer(state = initialState, { type, payload }: Action) {
    switch (type) {
        case "TodoAdd":
            return {
                ...state,
                todos: [...state.todos, payload],
            };
        case "TodoRemove":
            return {
                ...state,
                todos: state.todos.filter((o) => o.id !== payload),
            };
        default:
            return state;
    }
}
