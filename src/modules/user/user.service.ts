import { Result, IMapper, Filter } from 'types-ddd';
import UserAggregate from '@modules/user/domain/aggregates/user.aggregate';
import UserModel from '@modules/user/infra/models/user.model';
import IUserRepository from '@modules/user/domain/repo/user-repo.interface';
import UserMapper from '@modules/user/infra/mappers/user.mapper';
import UserRepository from '@modules/user/infra/database/user.repository';
import SignUpUseCase from '@modules/user/application/signup-use-case/signup.use-case';
import { IDatabase } from '@modules/user/infra/database/memory.db';
import SignUpDto from '@modules/user/application/signup-use-case/signup.dto';

export class UserService {
	private readonly mapper: IMapper<UserAggregate, UserModel>;
	private readonly repo: IUserRepository<UserAggregate, UserModel>;
	private readonly signUpUseCase: SignUpUseCase;
	
	constructor (
		private readonly database: IDatabase
	){
		this.mapper = new UserMapper();
		this.repo = new UserRepository(this.database, this.mapper);
		this.signUpUseCase = new SignUpUseCase(this.repo);
	}

	async signup (dto:SignUpDto): Promise<Result<void>>{
		return await this.signUpUseCase.execute(dto);
	}

	async getUsers (): Promise<UserModel[]> {
		return await this.repo.getUsers();
	}

	async getUserById (id: string): Promise<UserModel | null> {
		return await this.repo.getUserById(id);
	}

	async userExists (id: string): Promise<boolean> {
		return await this.repo.exists({ id });
	}

	async findOneUser (filter: Filter<Partial<UserModel>>): Promise<UserAggregate | null> {
		return await this.repo.findOneUser(filter);
	}
}

export default UserService;
