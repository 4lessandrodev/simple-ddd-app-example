import { IUseCase, Result } from 'types-ddd';
import SignInDto from '@modules/auth/application/signin-use-case/signin.dto';
import { TokenProp } from '@modules/auth/domain/value-objects/token.value-object';
import TokenValueObject from '@modules/auth/domain/value-objects/token.value-object';
import PayloadValueObject from '@modules/auth/domain/value-objects/payload.value-object';
import UserService from '@modules/user/user.service';

export class SingInUseCase implements IUseCase<SignInDto, Result<TokenProp>>{
	constructor (
		private readonly service: UserService
	){}

	async execute ({ email, password }: SignInDto): Promise<Result<TokenProp>> {
		try {
			const userExists = await this.service.findOneUser({ email});

			if (!userExists) {
				return Result.fail('[SingInUseCase]: User Not Found', 'NOT_FOUND');
			}

			const passwordMatch = userExists.password.compare(password);

			if(!passwordMatch) {
				return Result.fail('[SingInUseCase]: Invalid Credentials', 'UNAUTHORIZED');
			}

			const payloadOrError = PayloadValueObject.create(userExists.id.value);

			if (payloadOrError.isFailure){
				return Result.fail(payloadOrError.errorValue(), 'UNAUTHORIZED');
			}

			const payload = payloadOrError.getResult();
			const token = TokenValueObject
				.create()
				.getResult()
				.addPayload(payload);

			token.sign();

			return Result.ok<TokenProp, string>({ token: token.value });

		} catch (error) {
			return Result.fail('[SingInUseCase]: Internal Server Error', 'INTERNAL_SERVER_ERROR');
		}
	}
}
