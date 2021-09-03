import  { Filter, IMapper, Logger } from 'types-ddd';
import IUserRepository from '@modules/user/domain/repo/user-repo.interface';
import UserAggregate from '@modules/user/domain/aggregates/user.aggregate';
import  UserModel from '@modules/user/infra/models/user.model';
import  IDatabase from '@modules/user/infra/database/memory.db';

export class UserRepository implements IUserRepository<UserAggregate, UserModel>{
	constructor (
		private readonly database: IDatabase,
		private readonly mapper: IMapper<UserAggregate, UserModel>
	){}

	async save (target: UserAggregate): Promise<void>{
		const model = this.mapper.toPersistence(target);
		this.database.users.push(model);
		Logger.info('[User]: New user added');
	};

	async findOneUser (filter: Filter<Partial<UserModel>>): Promise<UserAggregate | null>{
		const userFound = this.database.users.find(
			(user) => user.id === filter?.id || 
			user.email.toLowerCase() === filter?.email?.toLowerCase() || 
			user.name.toLowerCase() === filter?.name?.toLowerCase()
		);
		if (!userFound) {
			return null;
		}
		return this.mapper.toDomain(userFound);
	};

	async exists (filter: Filter<Partial<UserModel>>):Promise<boolean>{
		const userFound = await this.findOneUser(filter);
		const exists =  !!userFound;
		return exists;
	};

	async getUsers (): Promise<UserModel[]> {
		return this.database.users;
	}

	async getUserById (id: string): Promise<UserModel | null> {
		const userFound = this.database.users.find((user) => user.id === id);
		if (!userFound) {
			return null;
		}
		return userFound;
	}
}

export default UserRepository;
