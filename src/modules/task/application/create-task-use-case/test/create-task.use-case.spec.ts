
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import TaskModel from '@modules/task/infra/models/task.model';
import ITaskRepository from '@modules/task/domain/repo/task-repo.interface';
import CreateTaskUseCase from '@modules/task/application/create-task-use-case/create-task.use-case';

describe('create-task.use-case', ()=>{

	let taskRepo: ITaskRepository<TaskAggregate, TaskModel>;

	beforeEach(()=>{
		taskRepo = {
			findOneTask: jest.fn(),
			getTasks: jest.fn(),
			save: jest.fn(),
		};
	});

	it('should be defined', ()=>{
		const useCase = new CreateTaskUseCase(taskRepo);
		expect(useCase).toBeDefined();
	});

	it('should fails if not provide task description', async ()=>{
		const useCase = new CreateTaskUseCase(taskRepo);
		const result = await useCase.execute({
			description: '',
			isDone: false,
			ownerId: 'valid_owner_id'
		});
		expect(result.isFailure).toBeTruthy();
	});

	it('should create a task with success', async ()=>{
		const useCase = new CreateTaskUseCase(taskRepo);
		const save = jest.spyOn(taskRepo, 'save');
		const result = await useCase.execute({
			description: 'valid_description',
			isDone: false,
			ownerId: 'valid_owner_id'
		});
		expect(result.isSuccess).toBeTruthy();
		expect(save).toHaveBeenCalled();
	});
});
