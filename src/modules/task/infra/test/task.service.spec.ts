import TaskService from '@modules/task/task.service';
import Database from '@modules/task/infra/database/memory.db';

describe('task.service', ()=>{
	it('should be defined', ()=>{
		const service = new TaskService(new Database());
		expect(service).toBeDefined();
	});

	it('should create a task', async ()=>{
		const service = new TaskService(new Database());
		const result = await service.createTask({
			description: 'valid_description',
			isDone: false,
			ownerId: 'valid_owner_id'
		});
		expect(result.isSuccess).toBeTruthy();
	});

	it('should get last created task', async ()=>{
		const service = new TaskService(new Database());

		await service.createTask({
			description: 'valid_description',
			isDone: false,
			ownerId: 'valid_owner_id'
		});

		const result = await service.getTasks();
		expect(result).toHaveLength(1);
		expect(result[0].description).toBe('valid_description');
	});

	it('should fail if provide an invalid description', async ()=>{
		const service = new TaskService(new Database());
		const result = await service.createTask({
			description: '',
			isDone: false,
			ownerId: 'valid_owner_id'
		});
		expect(result.isSuccess).toBeFalsy();
	});
});
