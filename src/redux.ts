import { createStore } from "redux";
import Todo, { TodoStatus } from "./Todo";

type State = { todos: Array<Todo> };

const initialState : State = {
    todos: [
        new Todo("Task #1", new Date(), TodoStatus.Paused),
        new Todo("Task #2", new Date(), TodoStatus.InProgress),
        new Todo("Task #3", new Date(), TodoStatus.InProgress),
    ]
}

export const store = createStore(
    reducer,
    initialState,
    //@ts-ignore
    window.devToolsExtension && window.devToolsExtension()
);

export class Action {
    constructor(
        public type: ActionType,
        public payload: any,
    ) { }
};

export enum ActionType {
    TodoAdd = 0,
}

function reducer(state = initialState, { type, payload }: Action) {
    switch(type) {
        case ActionType.TodoAdd:
            return {
                ...state,
                todos: [...state.todos, payload],
            }
        default:
            return state;
    }
}
