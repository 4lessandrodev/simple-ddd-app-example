import SignUpUseCase from '../signup.use-case';
import IUserRepository from '@modules/user/domain/repo/user-repo.interface';
import UserAggregate from '@modules/user/domain/aggregates/user.aggregate';
import UserModel from '@modules/user/infra/models/user.model';

describe('signup.use-case', ()=>{

	let userRepo: IUserRepository<UserAggregate, UserModel>;

	beforeEach(()=>{
		userRepo = {
			exists: jest.fn(),
			findOneUser: jest.fn(),
			getUsers: jest.fn(),
			save: jest.fn(),
			getUserById: jest.fn()
		};
	});

	it('should be defined', ()=>{
		const useCase = new SignUpUseCase(userRepo);
		expect(useCase).toBeDefined();
	});

	it('should fail if user already exists', async ()=>{

		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(true);
		const useCase = new SignUpUseCase(userRepo);
		const result = await useCase.execute({
			email: 'already_exists_email@domain.com',
			name: 'valid_name',
			password: 'valid_password',
		});
		expect(result.isFailure).toBeTruthy();
	});

	it('should fail if provide an invalid email', async ()=>{

		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(false);
		const useCase = new SignUpUseCase(userRepo);
		const result = await useCase.execute({
			email: 'invalid_email',
			name: 'valid_name',
			password: 'valid_password',
		});
		expect(result.isFailure).toBeTruthy();
	});

	it('should save with success', async ()=>{

		jest.spyOn(userRepo, 'exists').mockResolvedValueOnce(false);
		const save = jest.spyOn(userRepo, 'save');

		const useCase = new SignUpUseCase(userRepo);
		const result = await useCase.execute({
			email: 'valid_email@domain.com',
			name: 'valid_name',
			password: 'valid_password',
		});
		expect(result.isSuccess).toBeTruthy();
		expect(save).toHaveBeenCalled();
	});
});