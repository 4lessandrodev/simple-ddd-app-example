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

	it('should fail if try done a no exists task', async ()=>{
		const service = new TaskService(new Database());

		const result = await service.doneTask({
			taskId: 'invalid_task_id'
		});

		expect(result.isFailure).toBeTruthy();
	});

	it('should done a task with success', async ()=>{
		const service = new TaskService(new Database());

		await service.createTask({
			description: 'valid_description',
			isDone: false,
			ownerId: 'valid_owner_id'
		});

		const savedTask = await service.getTasks();
		expect(savedTask).toHaveLength(1);
		
		const task = savedTask[0];

		expect(task.isDone).toBeFalsy();
		await service.doneTask({ taskId: task.id });

		const updatedTask = await service.getTasks();
		expect(updatedTask).toHaveLength(1);

		expect(updatedTask[0].isDone).toBeTruthy();
	});
});
