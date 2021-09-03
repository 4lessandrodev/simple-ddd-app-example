import { Result } from 'types-ddd';
import UserService from '@modules/user/user.service';
import UserModule from '@modules/user/user.module';
import SignInDto from '@modules/auth/application/signin-use-case/signin.dto';
import UserModel from '@modules/user/infra/models/user.model';
import { SingInUseCase } from './application/signin-use-case/signin.use-case';
import { TokenProp } from '@modules/auth/domain/value-objects/token.value-object';
import { AuthorizeUseCase } from '@modules/auth/application/authorize-use-case/authorize.use-case';
import { PayloadProp } from '@modules/auth/domain/value-objects/payload.value-object';

export class AuthService {
	private readonly userService: UserService;
	private readonly signinUseCase: SingInUseCase;
	private readonly authorizeUseCase: AuthorizeUseCase;

	constructor (){
		this.userService = UserModule.publicUserService(),
		this.signinUseCase = new SingInUseCase(this.userService);
		this.authorizeUseCase = new AuthorizeUseCase(this.userService);
	}

	async getUserById (id: string):Promise<UserModel | null>{
		return await this.userService.getUserById(id);
	}

	async signin (dto: SignInDto): Promise<Result<TokenProp>>{
		return await this.signinUseCase.execute(dto);
	}

	async authorize (token: string): Promise<Result<PayloadProp, string>>{
		return await this.authorizeUseCase.execute({ token });
	}; 
}
