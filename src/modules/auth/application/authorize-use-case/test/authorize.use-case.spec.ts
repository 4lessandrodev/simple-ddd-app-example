import { AuthorizeUseCase } from '@modules/auth/application/authorize-use-case/authorize.use-case';
import UserService from '@modules/user/user.service';
import UserModel from '@modules/user/infra/models/user.model';
import TokenValueObject from '@modules/auth/domain/value-objects/token.value-object';
import PayloadValueObject from '@modules/auth/domain/value-objects/payload.value-object';
import { UniqueEntityID } from 'types-ddd';

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

		const userId = new UniqueEntityID();
		const payload = PayloadValueObject.create(userId).getResult();
		const token = TokenValueObject.create().getResult().addPayload(payload);
		token.sign();

		const useCase = new AuthorizeUseCase(userService);
		const result = await useCase.execute({ token: token.value });

		expect(result.isFailure).toBeTruthy();
	});

	it('should return user id with success', async ()=>{

		jest.spyOn(userService, 'getUserById').mockResolvedValueOnce(user);
		
		const userId = new UniqueEntityID();
		const payload = PayloadValueObject.create(userId).getResult();
		const token = TokenValueObject.create().getResult().addPayload(payload);
		token.sign();

		const useCase = new AuthorizeUseCase(userService);
		const result = await useCase.execute({ token: token.value });
		expect(result.isSuccess).toBeTruthy();
		expect(result.getResult().userId).toBe(userId.toString());
	});
});
