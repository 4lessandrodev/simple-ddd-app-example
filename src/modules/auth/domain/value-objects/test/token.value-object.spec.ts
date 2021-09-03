import { DomainId } from 'types-ddd/dist';
import PayloadValueObject from '@modules/auth/domain/value-objects/payload.value-object';
import TokenValueObject from '@modules/auth/domain/value-objects/token.value-object';

describe('token.value-object', ()=>{
	it('should be defined', ()=>{
		const create = TokenValueObject.create;
		expect(create).toBeDefined();
	});

	it('should start a token', ()=>{
		const token = TokenValueObject.create();
		expect(token.isSuccess).toBeTruthy();
	});

	it('should sign an user id', ()=>{
		const userId = PayloadValueObject.create(DomainId.create().value).getResult();

		const token = TokenValueObject
			.create()
			.getResult()
			.addPayload(userId);

		token.sign();
		expect(token.verify().isSuccess).toBeTruthy();
	});

	it('should return token as value', ()=>{
		
		const userId = PayloadValueObject.create(DomainId.create().value).getResult();

		const token = TokenValueObject
			.create()
			.getResult()
			.addPayload(userId);
			
		token.sign();

		expect(token.verify().isSuccess).toBeTruthy();

		expect(token.value).toHaveLength(192);
	});
});
