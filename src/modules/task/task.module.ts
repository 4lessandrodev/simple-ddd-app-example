import { Logger } from 'types-ddd';
import TaskService from '@modules/task/task.service';
import Database from '@modules/task/infra/database/memory.db';
import AfterTaskDoneSubscriber from './domain/subscribers/after-task-done.sub';

export class TaskModule {
	private static taskService: TaskService;

	get service (): TaskService {
		if(!TaskModule.taskService) {
			TaskModule.taskService = new TaskService(new Database());
			Logger.info('[Started]: TaskModule');

			// Set subscriber
			new AfterTaskDoneSubscriber();
			Logger.info('[Started]: TaskSubscriber');
		}
		return TaskModule.taskService;
	}
}

export default TaskModule;
