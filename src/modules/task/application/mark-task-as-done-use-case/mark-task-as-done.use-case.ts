import { IUseCase, Result, Logger } from 'types-ddd';
import MarkTaskAsDoneDto from '@modules/task/application/mark-task-as-done-use-case/mark-task-as-done.dto';
import ITaskRepository from '@modules/task/domain/repo/task-repo.interface';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import TaskModel from '@modules/task/infra/models/task.model';

export class MarkTaskAsDoneUseCase implements IUseCase<MarkTaskAsDoneDto, Result<void>> {
	constructor (
		private readonly taskRepo: ITaskRepository<TaskAggregate, TaskModel>
	){}

	async execute ({ taskId }:MarkTaskAsDoneDto): Promise<Result<void>>{
		try {
			const taskExists = await this.taskRepo.findOneTask({ id: taskId });
			if (!taskExists) {
				const message = `[MarkTaskAsDoneUseCase]: Task does not exists for id ${taskId}`;
				Logger.error(message);
				return Result.fail(message, 'NOT_FOUND');
			}
			
			const task = taskExists;
			task.markTaskAsDone();

			await this.taskRepo.save(task);

			return Result.success();
		} catch (error) {
			const message = '[MarkTaskAsDoneUseCase]: Internal Server Error';
			Logger.error(message);
			return Result.fail(message, 'INTERNAL_SERVER_ERROR');
		}
	}
}
