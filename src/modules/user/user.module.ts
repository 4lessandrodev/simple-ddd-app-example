import { Logger } from 'types-ddd';
import UserService from '@modules/user/user.service';
import Database from '@modules/user/infra/database/memory.db';

export class UserModule {
	private static userService: UserService;

	get service (): UserService {
		if(!UserModule.userService) {
			UserModule.userService = new UserService(new Database());
			Logger.info('[Started]: UserModule');
		}
		return UserModule.userService;
	}

	// public service to external modules
	public static publicUserService (): UserService {
		if (!UserModule.userService) {
			UserModule.userService = new UserService(new Database());
			Logger.info('[Started]: UserModule');
		}
		return UserModule.userService;
	}
}

export default UserModule;
