import { Logger } from 'types-ddd';
import TaskService from '@modules/task/task.service';
import Database from '@modules/task/infra/database/memory.db';

export class TaskModule {
	private static userService: TaskService;

	get service (): TaskService {
		if(!TaskModule.userService) {
			TaskModule.userService = new TaskService(new Database());
			Logger.info('[Started]: TaskModule');
		}
		return TaskModule.userService;
	}
}

export default TaskModule;
