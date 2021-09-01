import { TaskModel } from '@modules/task/infra/models/task.model';

export interface IDatabase {
	tasks: TaskModel[];
	onSave:(callback: any) => any;
}

export class Database implements IDatabase {
	public tasks: TaskModel[];
	constructor (){
		this.tasks = [];
	}

	onSave (callback: any): any {
		callback();
	}
};

export default Database;
