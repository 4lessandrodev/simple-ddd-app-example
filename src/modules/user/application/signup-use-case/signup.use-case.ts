import { DomainId, EmailValueObject, IUseCase, PasswordValueObject, Result, UserNameValueObject } from "types-ddd";
import SignUpDto from './signup.dto';
import IUserRepository from '../../domain/repo/user-repo.interface';
import UserAggregate from "../../domain/core/user.aggregate";
import UserModel from '../../infra/models/user.model';
import { ChangesObserver } from 'types-ddd';

export class SignUpUseCase implements IUseCase<SignUpDto, Result<void>> {
	constructor (
		private readonly userRepo: IUserRepository<UserAggregate, UserModel>
	){}
	async execute ({ email, password, name }: SignUpDto): Promise<Result<void>>{
		try {
			const userAlreadyExists = await this.userRepo.exists({ email });
			
			if (userAlreadyExists) {
				return Result.fail('User Already Exists for email', 'CONFLICT');
			}

			const passwordOrError = PasswordValueObject.create(password);
			const emailOrError = EmailValueObject.create(email);
			const nameOrError = UserNameValueObject.create(name);

			const observer = ChangesObserver.init<unknown>(
				[passwordOrError, emailOrError, nameOrError]
			);

			const isAllSuccess = observer.isAllResultsSuccess();
			if (!isAllSuccess) {
				return Result.fail(observer.getResult().errorValue());
			}

			const userOrError = UserAggregate.create(
				{
					ID: DomainId.create(),
					email: emailOrError.getResult(),
					name: nameOrError.getResult(),
					password: passwordOrError.getResult()
				}
			);

			if (userOrError.isFailure) {
				return Result.fail(userOrError.errorValue());
			}

			const user = userOrError.getResult();
			
			user.password.encrypt();

			await this.userRepo.save(user);

			return Result.success();
		} catch (error) {
			return Result.fail('Internal Server Error', 'INTERNAL_SERVER_ERROR');
		}
	};
}
