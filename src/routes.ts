import {Request, Response} from "express";
import {TaskController} from "./controller";


export class Routes {
    taskController: TaskController = new TaskController();
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "get success"
                });
            });
        app.route('/task')
        .get(this.taskController.getTask)
        .post(this.taskController.createTask)
        .delete(this.taskController.deleteTask);
    }
}
