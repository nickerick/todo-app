import { TodoTask } from "./todotask";

export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    tasks: TodoTask[];
}