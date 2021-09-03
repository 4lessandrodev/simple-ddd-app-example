import CreateTaskDto from '@modules/task/application/create-task-use-case/create-task.dto';
import ITaskRepository from '@modules/task/domain/repo/task-repo.interface';
import { DomainId, IUseCase, Result, Logger } from 'types-ddd';
import TaskModel from '@modules/task/infra/models/task.model';
import TaskDescriptionValueObject from '@modules/task/domain/value-objects/task-description.value-object';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';

export class CreateTaskUseCase implements IUseCase<CreateTaskDto, Result<void>>{

	constructor (
		private readonly taskRepo: ITaskRepository<TaskAggregate, TaskModel>
	){}

	async execute ({ description, ownerId, isDone }: CreateTaskDto): Promise<Result<void>> {
		try {
			const taskDescriptionOrError = TaskDescriptionValueObject.create(description);
			
			if (taskDescriptionOrError.isFailure) {
				const message = taskDescriptionOrError.errorValue();
				Logger.error(message);
				return Result.fail(message);
			}

			const owner = DomainId.create(ownerId);

			const taskOrError = TaskAggregate.create({
				ID: DomainId.create(),
				description: taskDescriptionOrError.getResult(),
				ownerId: owner,
				isDone
			});

			if (taskOrError.isFailure) {
				const message = taskOrError.errorValue();
				Logger.error(message);
				return Result.fail(message);
			}

			const task = taskOrError.getResult();
			await this.taskRepo.save(task);

			return Result.success();

		} catch (error) {
			const message = '[CreateTaskUseCase]: Internal Server Error';
			Logger.error(message);
			return Result.fail(message, 'INTERNAL_SERVER_ERROR');
		}
	}
}

export default CreateTaskUseCase;
