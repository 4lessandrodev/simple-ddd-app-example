import { AggregateRoot, DomainId, BaseDomainEntity, Result } from 'types-ddd';
import TaskDescriptionValueObject from '@modules/task/domain/value-objects/task-description.value-object';
import TaskDoneEvent from '@modules/task/domain/events/task-done.event';

export interface TaskProps extends BaseDomainEntity {
	ownerId: DomainId;
	description: TaskDescriptionValueObject;
	isDone: boolean;
}

export class TaskAggregate extends AggregateRoot<TaskProps> {
	private constructor (props: TaskProps) {
		super(props, TaskAggregate.name);
	}

	get ownerId (): DomainId {
		return this.props.ownerId;
	}

	get description (): TaskDescriptionValueObject {
		return this.props.description;
	}

	get isDone (): boolean {
		return this.props.isDone;
	}

	changeDescription (newDescription: TaskDescriptionValueObject): void {
		this.props.description = newDescription;
	}

	markTaskAsDone (): void {
		this.props.isDone = true;
		this.addDomainEvent(new TaskDoneEvent(this));
	}

	markTaskAsNotDone (): void {
		this.props.isDone = false;
	}

	public static create (props: TaskProps):Result<TaskAggregate>{
		return Result.ok(new TaskAggregate(props));
	}
}

export default TaskAggregate;
