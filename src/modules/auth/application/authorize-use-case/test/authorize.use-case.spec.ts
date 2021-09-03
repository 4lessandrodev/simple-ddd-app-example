import { AuthorizeUseCase } from '@modules/auth/application/authorize-use-case/authorize.use-case';
import UserService from '@modules/user/user.service';
import UserModel from '@modules/user/infra/models/user.model';

describe('authorize.use-case', ()=>{

	const user: UserModel ={
		createdAt: new Date(),
		email: 'valid_email@domain.com',
		id: 'valid_id',
		name: 'valid_name',
		password: 'valid_pass',
		updatedAt: new Date()
	};

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
		const useCase = new AuthorizeUseCase(userService);
		expect(useCase).toBeDefined();
	});

	it('should fail if provide an invalid token', async ()=>{
		const useCase = new AuthorizeUseCase(userService);
		const result = await useCase.execute({ token: 'invalid'});

		expect(result.isFailure).toBeTruthy();
	});

	it('should fail if user does not exists', async ()=>{

		jest.spyOn(userService, 'getUserById').mockResolvedValueOnce(null);

		const useCase = new AuthorizeUseCase(userService);
		const result = await useCase.execute(
			{ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTZkNDNkMC02MDk1LTQyMTgtYjVlMy1iZjk2ZjQ5NmFhNjEiLCJpYXQiOjE2MzA2MjY5MDgsImV4cCI6MTYzMDYzNDEwOH0.deLTMQ39bX2HSKPTeDFFW7Tngc6Nv8qgjgR0yPeOW64'}
		);

		expect(result.isFailure).toBeTruthy();
	});

	it('should return user id with success', async ()=>{

		jest.spyOn(userService, 'getUserById').mockResolvedValueOnce(user);
		
		const useCase = new AuthorizeUseCase(userService);
		const result = await useCase.execute(
			{ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTZkNDNkMC02MDk1LTQyMTgtYjVlMy1iZjk2ZjQ5NmFhNjEiLCJpYXQiOjE2MzA2MjY5MDgsImV4cCI6MTYzMDYzNDEwOH0.deLTMQ39bX2HSKPTeDFFW7Tngc6Nv8qgjgR0yPeOW64'}
		);
		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult().userId).toBe('196d43d0-6095-4218-b5e3-bf96f496aa61');
	});
});
