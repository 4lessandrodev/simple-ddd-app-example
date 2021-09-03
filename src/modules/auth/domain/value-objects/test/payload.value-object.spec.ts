import { DomainId } from 'types-ddd/dist';
import PayloadValueObject from '@modules/auth/domain/value-objects/payload.value-object';
import { UniqueEntityID } from 'types-ddd';

describe('payload.value-object', ()=>{
	it('should be defined', ()=>{
		const create = PayloadValueObject.create;
		expect(create).toBeDefined();
	});

	it('should create a valid payload', ()=>{
		const payload = PayloadValueObject.create(DomainId.create().value);
		expect(payload.isSuccess).toBeTruthy();
	});

	it('should fail if provide an invalid value', ()=>{
		const payload = PayloadValueObject.create(new UniqueEntityID('invalid_id'));
		expect(payload.isFailure).toBeTruthy();
	});
});
