import  { Filter, IMapper, Logger } from 'types-ddd';
import ITaskRepository from '@modules/task/domain/repo/task-repo.interface';
import TaskAggregate from '@modules/task/domain/aggregates/task.aggregate';
import  TaskModel from '@modules/task/infra/models/task.model';
import  IDatabase from '@modules/task/infra/database/memory.db';

export class TaskRepository implements ITaskRepository<TaskAggregate, TaskModel>{
	constructor (
		private readonly database: IDatabase,
		private readonly mapper: IMapper<TaskAggregate, TaskModel>
	){}

	async save (target: TaskAggregate): Promise<void>{
		const model = this.mapper.toPersistence(target);
		this.database.tasks.push(model);
		Logger.info('[Task]: New task added');
	};

	async findOneTask (filter: Filter<Partial<TaskModel>>): Promise<TaskAggregate | null>{
		const userFound = this.database.tasks.find(
			(user) => user.id === filter?.id || 
			user.description.toLowerCase() === filter?.description?.toLowerCase()
		);
		if (!userFound) {
			return null;
		}
		return this.mapper.toDomain(userFound);
	};

	async exists (filter: Filter<Partial<TaskModel>>):Promise<boolean>{
		const userFound = await this.findOneTask(filter);
		const exists =  !!userFound;
		return exists;
	};

	async getTasks (): Promise<TaskModel[]> {
		return this.database.tasks;
	}
}

export default TaskRepository;
