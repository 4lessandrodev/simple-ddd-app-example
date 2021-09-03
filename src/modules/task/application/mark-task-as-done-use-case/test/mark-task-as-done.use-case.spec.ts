import { MarkTaskAsDoneUseCase } from '@modules/task/application/mark-task-as-done-use-case/mark-task-as-done.use-case';
import TaskDescriptionValueObject from '@modules/task/domain/value-objects/task-description.value-object';
import ITaskRepository from '@modules/task/domain/repo/task-repo.interface';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import TaskModel from '@modules/task/infra/models/task.model';
import { DomainId } from 'types-ddd';

describe('mark-task-as-done.use-case', ()=>{

	let taskRepo: ITaskRepository<TaskAggregate, TaskModel>;
	const task: TaskAggregate = TaskAggregate.create({
		ID: DomainId.create('valid_task_id'),
		description: TaskDescriptionValueObject.create('valid_task_description').getResult(),
		isDone: false,
		ownerId: DomainId.create()
	}).getResult();

	beforeEach(()=>{
		taskRepo = {
			findOneTask: jest.fn(),
			getTasks: jest.fn(),
			save: jest.fn(),
		};
	});

	it('should be defined', ()=>{
		const useCase = new MarkTaskAsDoneUseCase(taskRepo);
		expect(useCase).toBeDefined();
	});

	it('should fail is task does not exists', async ()=>{

		jest.spyOn(taskRepo, 'findOneTask').mockResolvedValueOnce(null);

		const useCase = new MarkTaskAsDoneUseCase(taskRepo);
		const result = await useCase.execute({ taskId: 'invalid_task_id' });
		expect(result.isFailure).toBeTruthy();
	});

	it('should update task with success', async ()=>{

		jest.spyOn(taskRepo, 'findOneTask').mockResolvedValueOnce(task);
		const save = jest.spyOn(taskRepo, 'save');

		const useCase = new MarkTaskAsDoneUseCase(taskRepo);
		const result = await useCase.execute({ taskId: 'valid_task_id' });
		expect(result.isSuccess).toBeTruthy();
		expect(task.isDone).toBeTruthy();
		expect(save).toHaveBeenCalledWith(task);
	});
});
