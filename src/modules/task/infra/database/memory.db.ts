import { TaskModel } from '@modules/task/infra/models/task.model';

export interface IDatabase {
	tasks: TaskModel[]
}

export class Database implements IDatabase {
	public tasks: TaskModel[];
	constructor (){
		this.tasks = [];
	}

};

export default Database;
