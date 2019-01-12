import {Schema, Document, Model, model} from "mongoose";

export interface ITask extends Document {
    title: string;
    created: Date;
    tags: string[];
    content: any;
}

// this task model is essentially abstract
export const TaskModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: new Date()
    },
    tags: {
        type: [String],
    },
});

// and here we define the types of tasks and how they define what content is
const ListTaskModel = new Schema({
    content: [String]
});

const BasicTaskModel = new Schema({
    content: String
});

const ImageTaskModel = new Schema({
    content: String     // just using a file path for now?
})

export const Task: Model<ITask> = model<ITask>("Task", TaskModel);

export const BasicTask: Model<ITask> = Task.discriminator<ITask>("BasicTask", BasicTaskModel);

export const ListTask: Model<ITask> = Task.discriminator<ITask>("ListTask", ListTaskModel);

export const ImageTask: Model<ITask> = Task.discriminator<ITask>("ImageTask", ImageTaskModel);
