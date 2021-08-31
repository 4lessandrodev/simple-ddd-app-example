import { Logger } from 'types-ddd/dist';
import { UserService } from './user.service';
import Database from './user/infra/database/memory.db';

export class UserModule {
	private static userService: UserService;

	get service (): UserService {
		if(!UserModule.userService) {
			Logger.info('[Started]: UserModule');
			UserModule.userService = new UserService(new Database());
		}
		return UserModule.userService;
	}
}

export default UserModule;
