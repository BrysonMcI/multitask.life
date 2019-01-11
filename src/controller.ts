import * as mongoose from "mongoose";
import {Task, BasicTask, ListTask} from "./models";
import {Request, Response} from "express";

// make sure this goes somewhere smart
mongoose.connect('mongodb://localhost:27017/mtl');

export class TaskController {
    public async createTask(req: Request, res: Response) {
        let newTask;
        console.log(req.body);  // leave debug for now
        if (Array.isArray(req.body.content)) {
            newTask = new ListTask(req.body);
        } else if (req.body.content) {
            newTask = new BasicTask(req.body);
        } else {
            newTask = new Task(req.body);
        }
        let st = 202;
        try {
            await newTask.save();
        } catch (err){
            console.error(err);
            console.error('error saving new task');
            st = 400;
        } finally {
            res.status(st).send();
        }
    }
    public async getTask(req: Request, res: Response) {
        try {
            let task = await Task.find({});
            res.status(200).json(task);
        } catch (err) {
            console.error('could not find task');
            res.status(404).send();
        }
    }
    public async deleteTask(req: Request, res: Response) {
        try {
            await Task.deleteOne({title: 'test 1'});
            res.status(202).send();
        } catch (err){
            console.error('could not delete one', err);
            res.status(400).send();
        }
    }
}
