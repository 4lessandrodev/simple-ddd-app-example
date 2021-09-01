import { IDomainEvent, UniqueEntityID } from 'types-ddd';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';

export class TaskDoneEvent implements IDomainEvent {
	public dateTimeOccurred: Date;
	public task: TaskAggregate;

	constructor (
		task: TaskAggregate
	){
		this.task = task;
		this.dateTimeOccurred = new Date();
	}

	getAggregateId (): UniqueEntityID {
		return this.task.id.value;
	}

}

export default TaskDoneEvent;
