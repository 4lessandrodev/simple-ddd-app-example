import UserService from '@modules/user/user.service';
import Database from '@modules/user/infra/database/memory.db';

describe('user.service', ()=>{
	it('should be defined', ()=>{
		const service = new  UserService(new Database);
		expect(service).toBeDefined();
	});

	it('should create a user', async ()=>{
		const service = new  UserService(new Database);
		const result = await service.signup({
			email: 'valid_email@domain.com',
			name: 'valid_name',
			password: 'valid_pass'
		});

		expect(result.isSuccess).toBeTruthy();
	});

	it('should get a created user', async ()=>{
		const service = new  UserService(new Database);
		await service.signup({
			email: 'valid_email@domain.com',
			name: 'valid_name',
			password: 'valid_pass'
		});

		const users = await service.getUsers();
		expect(users).toHaveLength(1);
		expect(users[0].email).toBe('valid_email@domain.com');
	});

	it('should fail if provide an invalid email', async ()=>{
		const service = new  UserService(new Database);
		const result = await service.signup({
			email: 'invalid_email',
			name: 'valid_name',
			password: 'valid_pass'
		});

		expect(result.isFailure).toBeTruthy();
	});
});