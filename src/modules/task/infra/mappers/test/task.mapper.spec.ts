import TaskModel from '@modules/task/infra/models/task.model';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import { DomainId } from 'types-ddd/dist';
import TaskDescriptionValueObject from '@modules/task/domain/value-objects/task-description.value-object';
import TaskMapper from '@modules/task/infra/mappers/task.mapper';

describe('task.mapper', ()=>{
	const currentDate = new Date();

	const model: TaskModel = {
		id: 'valid_task_id',
		createdAt: currentDate,
		description: 'valid_task_description',
		isDone: false,
		ownerId: 'valid_owner_id',
		updatedAt: currentDate
	};
	const aggregate: TaskAggregate = TaskAggregate.create(
		{
			ID: DomainId.create('valid_task_id'),
			description: TaskDescriptionValueObject.create('valid_task_description').getResult(),
			isDone: false,
			ownerId: DomainId.create('valid_owner_id'),
			createdAt: currentDate,
			updatedAt: currentDate
		}
	).getResult();

	it('should be defined', ()=>{
		const mapper = new TaskMapper();
		expect(mapper).toBeDefined();
	});

	it('should convert from domain to persistence', ()=>{
		const mapper = new TaskMapper();
		const schema = mapper.toPersistence(aggregate);
		expect(schema).toEqual(model);
	});

	it('should convert from persistence to domain', ()=>{
		const mapper = new TaskMapper();
		const domain = mapper.toDomain(model);
		expect(aggregate).toEqual(domain);
	});
});