import { Result, IMapper } from 'types-ddd';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import TaskModel from '@modules/task/infra/models/task.model';
import IUserRepository from '@modules/task/domain/repo/task-repo.interface';
import TaskMapper from '@modules/task/infra/mappers/task.mapper';
import UserRepository from '@modules/task/infra/database/task.repository';
import CreateTaskUseCase from '@modules/task/application/create-task-use-case/create-task.use-case';
import { IDatabase } from '@modules/task/infra/database/memory.db';
import CreateTaskDto from '@modules/task/application/create-task-use-case/create-task.dto';

export class UserService {
	private readonly mapper: IMapper<TaskAggregate, TaskModel>;
	private readonly repo: IUserRepository<TaskAggregate, TaskModel>;
	private readonly createTaskUserCase: CreateTaskUseCase;
	
	constructor (
		private readonly database: IDatabase
	){
		this.mapper = new TaskMapper();
		this.repo = new UserRepository(this.database, this.mapper);
		this.createTaskUserCase = new CreateTaskUseCase(this.repo);
	}

	async createTask (dto:CreateTaskDto): Promise<Result<void>>{
		return await this.createTaskUserCase.execute(dto);
	}

	async getTasks (): Promise<TaskModel[]> {
		return await this.repo.getTasks();
	}
}

export default UserService;
