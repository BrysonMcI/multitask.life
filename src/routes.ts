import {Request, Response} from "express";
import {TaskController} from "./controller";

export class Routes {
    taskController: TaskController = new TaskController();
    public routes(app: any): void { // fix typing later
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "get success"
                });
            });
        app.route('/task')
        .get(this.taskController.getTask)
        .post(this.taskController.createTask)
        .put(this.taskController.updateTask)
        .delete(this.taskController.deleteTask);

        app.route('/task/join')
        .post(this.taskController.addChildTask);
    }
}
