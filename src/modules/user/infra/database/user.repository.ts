import  { Filter, IMapper } from 'types-ddd';
import IUserRepository from '../../domain/repo/user-repo.interface';
import UserAggregate from '../..//domain/core/user.aggregate';
import  UserModel from '../../infra/models/user.model';
import  IDatabase from './memory.db';

export class UserRepository implements IUserRepository<UserAggregate, UserModel>{
	constructor (
		private readonly database: IDatabase,
		private readonly mapper: IMapper<UserAggregate, UserModel>
	){}

	async save (target: UserAggregate): Promise<void>{
		const model = this.mapper.toPersistence(target);
		this.database.users.push(model);
		console.table(model);
	};

	async findOneUser (filter: Filter<Partial<UserModel>>): Promise<UserAggregate | null>{
		const userFound = this.database.users.find((user) => user.id === filter?.id || user.name === filter?.name);
		if (!userFound) {
			return null;
		}
		return this.mapper.toDomain(userFound);
	};

	async exists (filter: Filter<Partial<UserModel>>):Promise<boolean>{
		const userFound = this.database.users.find((user) => user.id === filter?.id || user.name === filter?.name);
		return !!userFound;
	};
}
