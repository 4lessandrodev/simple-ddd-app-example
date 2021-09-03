import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import { DomainId } from 'types-ddd/dist';
import TaskDescriptionValueObject from '@modules/task/domain/value-objects/task-description.value-object';

describe('task.aggregate', ()=>{
	it('should be defined', ()=>{
		const aggregate = TaskAggregate.create;
		expect(aggregate).toBeDefined();
	});

	it('should create a valid aggregate', ()=>{
		const aggregate = TaskAggregate.create(
			{
				ID: DomainId.create(),
				description: TaskDescriptionValueObject.create('valid_description').getResult(),
				isDone: false,
				ownerId: DomainId.create(),
			}
		);
		const task = aggregate.getResult();
		expect(aggregate.isSuccess).toBeTruthy();
		expect(task.isDone).toBeFalsy();
		expect(task.description.value).toBe('valid_description');
	});

	it('should toggle task', ()=>{
		const task = TaskAggregate.create(
			{
				ID: DomainId.create(),
				description: TaskDescriptionValueObject.create('valid_description').getResult(),
				isDone: true,
				ownerId: DomainId.create(),
			}
		).getResult();
		expect(task.isDone).toBeTruthy();
		task.markTaskAsNotDone();
		expect(task.isDone).toBeFalsy();
		task.markTaskAsDone();
		expect(task.isDone).toBeTruthy();
	});

	it('should change task description', ()=>{
		const task = TaskAggregate.create(
			{
				ID: DomainId.create(),
				description: TaskDescriptionValueObject.create('valid_description').getResult(),
				isDone: true,
				ownerId: DomainId.create(),
			}
		).getResult();
		expect(task.description.value).toBe('valid_description');
		const newDescription = TaskDescriptionValueObject.create('new_changed_description').getResult();
		task.changeDescription(newDescription);
		expect(task.description.value).toBe('new_changed_description');
	});

	it('should create a task with provided id', ()=>{
		const task = TaskAggregate.create(
			{
				ID: DomainId.create('valid_id'),
				description: TaskDescriptionValueObject.create('valid_description').getResult(),
				isDone: true,
				ownerId: DomainId.create(),
			}
		).getResult();
		expect(task.id.value.toString()).toBe('valid_id');
	});
});
