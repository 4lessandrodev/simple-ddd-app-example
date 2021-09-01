import TaskModule from '@modules/task/task.module';
import TaskService from '@modules/task/task.service';

describe('task.module', ()=>{
	it('should be defined', ()=>{
		const module = new TaskModule();
		expect(module).toBeDefined();
	});

	it('should create service instance', ()=>{
		const module = new TaskModule();
		const service = module.service;
		expect(service).toBeInstanceOf(TaskService);
	});
});