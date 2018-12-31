import {Schema} from "mongoose";

export class Task {
    title: string;
    description?: string;
}

export const TaskModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
});
