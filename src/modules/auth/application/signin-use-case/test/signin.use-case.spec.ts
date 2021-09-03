
import UserService from '@modules/user/user.service';
import { SingInUseCase } from '@modules/auth/application/signin-use-case/signin.use-case';
import UserAggregate from '@modules/user/domain/aggregates/user.aggregate';
import { PasswordValueObject, UserNameValueObject, EmailValueObject, DomainId } from 'types-ddd';

describe('signin.use-case', ()=>{

	const user: UserAggregate = UserAggregate.create(
		{
			ID: DomainId.create(),
			email: EmailValueObject.create('valid_email@domain.com').getResult(),
			name: UserNameValueObject.create('valid name').getResult(),
			password: PasswordValueObject.create('valid_password').getResult(),
		}
	).getResult();
	let userService: UserService;

	beforeEach(()=>{
		userService = {
			 signup: jest.fn(),
			 getUsers: jest.fn(),
			 getUserById : jest.fn(),
			 userExists : jest.fn(),
			 findOneUser : jest.fn(),
		} as unknown as UserService;
	});
	it('should be defined', ()=>{
		const useCase = new SingInUseCase(userService);
		expect(useCase).toBeDefined();
	});

	it('should fail if user does not exists', async ()=>{
		jest.spyOn(userService, 'findOneUser').mockResolvedValueOnce(null);
		const useCase = new SingInUseCase(userService);

		const result = await useCase.execute({
			 email: 'invalid_email@domain.com',
			 password: 'valid_password'
		});
		expect(result.isFailure).toBeTruthy();
	});

	it('should fail if password does not match', async ()=>{
		jest.spyOn(userService, 'findOneUser').mockResolvedValueOnce(user);
		const useCase = new SingInUseCase(userService);

		const result = await useCase.execute({
			 email: 'valid_email@domain.com',
			 password: 'invalid_password'
		});
		expect(result.isFailure).toBeTruthy();
	});

	it('should return as token with success', async ()=>{
		jest.spyOn(userService, 'findOneUser').mockResolvedValueOnce(user);
		const useCase = new SingInUseCase(userService);

		const result = await useCase.execute({
			 email: 'valid_email@domain.com',
			 password: 'valid_password'
		});
		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult().token).toBeDefined();
		expect(result.getResult().token).toHaveLength(192);
	});

});
