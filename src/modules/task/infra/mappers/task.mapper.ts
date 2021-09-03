import { IMapper, DomainId } from 'types-ddd';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import TaskModel from '@modules/task/infra/models/task.model';
import TaskDescriptionValueObject from '@modules/task/domain/value-objects/task-description.value-object';

export class TaskMapper implements IMapper<TaskAggregate, TaskModel>{
	toDomain (target: TaskModel): TaskAggregate{
		return TaskAggregate.create(
			{
				ID: DomainId.create(target.id),
				description: TaskDescriptionValueObject.create(target.description).getResult(),
				isDone: target.isDone,
				ownerId: DomainId.create(target.ownerId),
				createdAt: target.createdAt,
				updatedAt: target.updatedAt,
			}
		).getResult();
	};

	toPersistence (target: TaskAggregate):TaskModel{
		return {
			id: target.id.value.toString(),
			description: target.description.value,
			isDone: target.isDone,
			ownerId: target.ownerId.value.toString(),
			createdAt: target.createdAt,
			updatedAt: target.updatedAt
		};
	};
}

export default TaskMapper;
