import "./model/db";
import {ITask, Task, BasicTask, ListTask} from "./model/Task";
import {Request, Response} from "express";

export class TaskController {
    public async createTask(req: Request, res: Response) {
        let newTask: ITask;
        console.log(req.body);  // leave debug for now
        if (Array.isArray(req.body.content)) {
            newTask = createListTask(req.body);
        } else if (req.body.content) {
            newTask = createBasicTask(req.body);
        } else {
            return res.status(400).json({"reason": "no content"});
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
            let task: ITask[] = await Task.find({});
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

function createListTask(data: any): ITask {
    return new ListTask(data);
}

function createBasicTask(data: any): ITask {
    return new BasicTask(data);
}
