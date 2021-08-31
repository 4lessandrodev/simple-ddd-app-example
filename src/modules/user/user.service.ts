import { IMapper } from 'types-ddd/dist';
import UserAggregate from './domain/aggregates/user.aggregate';
import Database from './infra/database/memory.db';
import UserModel from './infra/models/user.model';
import IUserRepository from './domain/repo/user-repo.interface';
import { UserMapper } from './infra/mappers/user.mapper';
import { UserRepository } from './infra/database/user.repository';
import { SignUpUseCase } from './application/signup-use-case/signup.use-case';
import { IDatabase } from './infra/database/memory.db';
import { Result } from 'types-ddd';
import SignUpDto from './application/signup-use-case/signup.dto';

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
