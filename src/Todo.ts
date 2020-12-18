import { v4 } from "uuid";

export default class Todo {
    id: string;
    constructor(
        public title: string,
        public date: Date,
        public status: TodoStatus
    ) {
        this.id = v4();
    }
}

export enum TodoStatus {
    Paused = "Paused",
    InProgress = "In Progress",
    Done = "Done",
}
