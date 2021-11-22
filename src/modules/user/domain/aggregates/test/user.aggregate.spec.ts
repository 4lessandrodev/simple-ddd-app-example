import UserAggregate from '@modules/user/domain/aggregates/user.aggregate';
import {
	DomainId,
	PasswordValueObject,
	UserNameValueObject
} from 'types-ddd/dist';
import { EmailValueObject } from 'types-ddd';
describe('user.aggregate', () => {
	it('should be defined', () => {
		const aggregate = UserAggregate.create;
		expect(aggregate).toBeDefined();
	});

	it('should create a valid aggregate', () => {
		const aggregate = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create(
				'valid_email@domain.com'
			).getResult(),
			name: UserNameValueObject.create('valid name').getResult(),
			password: PasswordValueObject.generateRandomPassword(8)
		});

		expect(aggregate.isSuccess).toBeTruthy();
	});

	it('should create has getter defined', () => {
		const aggregate = UserAggregate.create({
			ID: DomainId.create('valid_id'),
			email: EmailValueObject.create(
				'valid_email@domain.com'
			).getResult(),
			name: UserNameValueObject.create('valid name').getResult(),
			password: PasswordValueObject.create('valid_pass').getResult()
		}).getResult();

		expect(aggregate.id.value.toString()).toBe('valid_id');
		expect(aggregate.email.value).toBe('valid_email@domain.com');
		expect(aggregate.name.value).toBe('Valid Name');
		expect(aggregate.password.value).toBe('valid_pass');
	});

	it('should encrypt a password many times', () => {
		const pass = PasswordValueObject.create('valid_pass').getResult();
		expect(pass.compare('valid_pass')).toBeTruthy();
		pass.encrypt();
		expect(pass.compare('valid_pass')).toBeTruthy();
		pass.encrypt();
		expect(pass.compare('valid_pass')).toBeTruthy();
	});
});
