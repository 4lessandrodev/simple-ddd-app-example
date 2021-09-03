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
				return Result.fail(payloadOrError.errorValue(), 'UNAUTHORIZED');
			}

			const payload = payloadOrError.getResult();
			const userId = payload.value;

			const userExists = await this.userService.getUserById(userId.toString());

			if(!userExists) {
				return Result.fail('[AuthorizeUseCase]: User Not Found', 'NOT_FOUND');
			}

			return Result.ok({ userId });

		} catch (error) {
			return Result.fail('[AuthorizeUseCase]: Internal Server Error', 'INTERNAL_SERVER_ERROR');
		}
	}
}
