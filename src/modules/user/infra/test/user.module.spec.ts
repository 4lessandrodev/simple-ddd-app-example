import UserModule from '@modules/user/user.module';
import UserService from '@modules/user/user.service';

describe('user.module', ()=>{
	it('should be defined', ()=>{
		const module = new UserModule();
		expect(module).toBeDefined();
	});

	it('should create service instance', ()=>{
		const module = new UserModule();
		const service = module.service;
		expect(service).toBeInstanceOf(UserService);
	});
});