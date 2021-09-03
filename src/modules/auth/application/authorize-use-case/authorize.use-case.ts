import { IUseCase, Result } from 'types-ddd';
import UserService from '@modules/user/user.service';
import TokenValueObject from '@modules/auth/domain/value-objects/token.value-object';
import { PayloadProp } from '@modules/auth/domain/value-objects/payload.value-object';
import AuthorizeDto from '@modules/auth/application/authorize-use-case/authorize.dto';

export class AuthorizeUseCase implements IUseCase<AuthorizeDto, Result<PayloadProp>> {
	constructor (
		private readonly userService: UserService
	){}

	async execute (dto: AuthorizeDto): Promise<Result<PayloadProp>>{
		try {
			const token = TokenValueObject.create(dto.token).getResult();

			const payloadOrError = token.verify();

			if(payloadOrError.isFailure) {
				return Result.fail('[AuthorizeUseCase]: Invalid Token');
			}

			const payload = payloadOrError.getResult();
			const userId = payload.value.toString();

			const userExists = await this.userService.getUserById(userId);

			if(!userExists) {
				return Result.fail('[AuthorizeUseCase]: Invalid Token');
			}

			return Result.ok({ userId: payload.value });

		} catch (error) {
			return Result.fail('[AuthorizeUseCase]: Internal Server Error');
		}
	}
}
