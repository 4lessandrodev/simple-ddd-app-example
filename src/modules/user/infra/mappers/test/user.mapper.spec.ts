import UserAggregate from '@modules/user/domain/aggregates/user.aggregate';
import UserModel from '@modules/user/infra/models/user.model';
import { DomainId, EmailValueObject, PasswordValueObject, UserNameValueObject } from 'types-ddd/dist';
import UserMapper from '@modules/user/infra/mappers/user.mapper';


describe('user.mapper', ()=>{
	const currentDate = new Date();
	const aggregate: UserAggregate = UserAggregate.create(
		{
			ID: DomainId.create('valid_id'),
			email: EmailValueObject.create('valid_email@domain.com').getResult(),
			name: UserNameValueObject.create('valid_name').getResult(),
			password: PasswordValueObject.create('valid_pass').getResult(),
			createdAt: currentDate,
			updatedAt: currentDate
		}
	).getResult();

	const model: UserModel = {
		id: 'valid_id',
		email: 'valid_email@domain.com',
		name: 'Valid_name',
		password: 'valid_pass',
		createdAt: currentDate,
		updatedAt: currentDate
	};

	it('should be defined', ()=>{
		const mapper = new UserMapper();
		expect(mapper).toBeDefined();
	});


	it('should convert from domain to persistence', ()=>{
		const mapper = new UserMapper();
		const persistence = mapper.toPersistence(aggregate);
		expect(persistence).toEqual(model);
	});


	it('should convert  from persistence to domain', ()=>{
		const mapper = new UserMapper();
		const domain = mapper.toDomain(model);
		expect(domain).toEqual(aggregate);
	});
});