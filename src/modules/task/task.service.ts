import { Result, IMapper } from 'types-ddd';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import TaskModel from '@modules/task/infra/models/task.model';
import ITaskRepository from '@modules/task/domain/repo/task-repo.interface';
import TaskMapper from '@modules/task/infra/mappers/task.mapper';
import TaskRepository from '@modules/task/infra/database/task.repository';
import CreateTaskUseCase from '@modules/task/application/create-task-use-case/create-task.use-case';
import { IDatabase } from '@modules/task/infra/database/memory.db';
import CreateTaskDto from '@modules/task/application/create-task-use-case/create-task.dto';
import { MarkTaskAsDoneUseCase } from '@modules/task/application/mark-task-as-done-use-case/mark-task-as-done.use-case';
import MarkTaskAsDoneDto from '@modules/task/application/mark-task-as-done-use-case/mark-task-as-done.dto';

export class TaskService {
	private readonly mapper: IMapper<TaskAggregate, TaskModel>;
	private readonly repo: ITaskRepository<TaskAggregate, TaskModel>;
	private readonly createTaskUserCase: CreateTaskUseCase;
	private readonly markTaskAsDoneUserCase: MarkTaskAsDoneUseCase;

	constructor (
		private readonly database: IDatabase
	) {
		this.mapper = new TaskMapper();
		this.repo = new TaskRepository(this.database, this.mapper);
		this.createTaskUserCase = new CreateTaskUseCase(this.repo);
		this.markTaskAsDoneUserCase = new MarkTaskAsDoneUseCase(this.repo);
	}

	async createTask (dto: CreateTaskDto): Promise<Result<void>> {
		return await this.createTaskUserCase.execute(dto);
	}

	async getTasks (): Promise<TaskModel[]> {
		return await this.repo.getTasks();
	}

	async doneTask (dto: MarkTaskAsDoneDto): Promise<Result<void>> {
		return await this.markTaskAsDoneUserCase.execute(dto);
	}
}

export default TaskService;
