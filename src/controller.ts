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
        try {
            let rs = await newTask.save();
            res.status(201).json(rs);
        } catch (err){
            console.error(err);
            console.error('error saving new task');
            res.status(400).json(err);
        }
    }
    public async updateTask(req: Request, res: Response) {
        if (!req.body.id || !req.body.task) {
            return res.status(400).json({
                "reason": "missing parameters"
            });
        }
        try {
            // right now this works but will require some duplicate data, like if
            // tags are being updated we need to send all tags, not just new
            // also of note: it looks like this will massage a different content
            // back to the original task type's desired content
            let t: ITask = await Task.updateOne({_id: req.body.id}, req.body.task);
            res.status(200).json(t);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);  // eventually remove the error dumping
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
        if (!req.body.id) {
            return res.status(400).json({
                "reason": "missing parameter"
            });
        }
        try {
            let del: ITask = await Task.deleteOne({_id: req.body.id});
            res.status(202).json(del);
        } catch (err){
            console.error('could not delete one', err);
            res.status(400).send();
        }
    }
}

// helper creation functions
function createListTask(data: any): ITask {
    return new ListTask(data);
}

function createBasicTask(data: any): ITask {
    return new BasicTask(data);
}
