import { IMapper } from 'types-ddd/dist';
import UserAggregate from './user/domain/core/user.aggregate';
import Database from './user/infra/database/memory.db';
import UserModel from './user/infra/models/user.model';
import IUserRepository from './user/domain/repo/user-repo.interface';
import { UserMapper } from './user/infra/mappers/user.mapper';
import { UserRepository } from './user/infra/database/user.repository';
import { SignUpUseCase } from './user/application/signup-use-case/signup.use-case';
import { IDatabase } from './user/infra/database/memory.db';
import { Result } from 'types-ddd';
import SignUpDto from './user/application/signup-use-case/signup.dto';

export class UserService {
	private readonly mapper: IMapper<UserAggregate, UserModel>;
	private readonly repo: IUserRepository<UserAggregate, UserModel>;
	private readonly signUpUseCase: SignUpUseCase;
	
	constructor (
		private readonly database: IDatabase
	){
		this.database = new Database();
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
}
