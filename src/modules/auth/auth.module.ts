import { AuthService } from './auth.service';
import { Logger } from 'types-ddd';

export class AuthModule {
	private static authService: AuthService;

	get service (): AuthService {
		if(!AuthModule.authService) {
			AuthModule.authService = new AuthService();
			Logger.info('[Started]: AuthModule');
		}
		return AuthModule.authService;
	}
}

export default AuthModule;
