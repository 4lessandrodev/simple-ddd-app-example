import { DomainId, EmailValueObject, IMapper, PasswordValueObject, UserNameValueObject } from 'types-ddd';
import UserAggregate from '@modules/user/domain/aggregates/user.aggregate';
import UserModel from '@modules/user/infra/models/user.model';

export class UserMapper implements IMapper<UserAggregate, UserModel>{
	toDomain (target: UserModel):UserAggregate{

		return UserAggregate.create(
			{
				ID: DomainId.create(target.id),
				email: EmailValueObject.create(target.email).getResult(),
				name: UserNameValueObject.create(target.name).getResult(),
				password: PasswordValueObject.create(target.password).getResult(),
				createdAt: target.createdAt,
				updatedAt: target.updatedAt,
			}
		).getResult();
	};
	toPersistence (target: UserAggregate): UserModel{
		return {
			createdAt: target.createdAt,
			email: target.email.value,
			id: target.id.value.toString(),
			name: target.name.value,
			password: target.password.value,
			updatedAt: target.updatedAt,
		}; 
	};
}

export default UserMapper;
