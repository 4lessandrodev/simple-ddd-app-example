import { AggregateRoot, BaseDomainEntity, Result } from 'types-ddd/dist/core';
import { EmailValueObject, PasswordValueObject, UserNameValueObject } from 'types-ddd/dist/utils';


export interface UserProps extends BaseDomainEntity {
	email: EmailValueObject;
	name: UserNameValueObject;
	password: PasswordValueObject;
}

export class UserAggregate extends AggregateRoot<UserProps> {
	private constructor (props: UserProps) {
		super(props, UserAggregate.name);
	}

	get email (): EmailValueObject {
		return this.props.email;
	}

	get name (): UserNameValueObject {
		return this.props.name;
	}

	get password (): PasswordValueObject {
		return this.props.password;
	}

	public static create (props: UserProps): Result<UserAggregate> {
		return Result.ok(new UserAggregate(props));
	}
}

export default UserAggregate;
