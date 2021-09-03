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
				return Result.fail('User not found', 'NOT_FOUND');
			}

			const passwordMatch = userExists.password.compare(password);

			if(!passwordMatch) {
				return Result.fail('Invalid credentials', 'UNAUTHORIZED');
			}

			const payloadOrError = PayloadValueObject.create(userExists.id.value);

			if (payloadOrError.isFailure){
				return Result.fail('Invalid credentials', 'UNAUTHORIZED');
			}

			const payload = payloadOrError.getResult();
			const token = TokenValueObject
				.create()
				.getResult()
				.addPayload(payload);

			token.sign();

			return Result.ok<TokenProp, string>({ token: token.value });

		} catch (error) {
			return Result.fail('Internal server error', 'INTERNAL_SERVER_ERROR');
		}
	}
}
