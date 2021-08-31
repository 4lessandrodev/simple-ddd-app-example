import { Logger } from 'types-ddd/dist';
import { UserService } from './user.service';
import Database from './infra/database/memory.db';

export class UserModule {
	private static userService: UserService;

	get service (): UserService {
		if(!UserModule.userService) {
			UserModule.userService = new UserService(new Database());
			Logger.info('[Started]: UserModule');
		}
		return UserModule.userService;
	}
}

export default UserModule;
