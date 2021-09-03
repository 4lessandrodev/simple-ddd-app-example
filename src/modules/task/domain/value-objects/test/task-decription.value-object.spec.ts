import TaskDescriptionValueObject from '@modules/task/domain/value-objects/task-description.value-object';
describe('task-description.value-object', ()=>{

	it('should be defined', ()=>{
		const valueObject = TaskDescriptionValueObject.create;
		expect(valueObject).toBeDefined();
	});

	it('should create a valid description with success', ()=>{
		const valueObject = TaskDescriptionValueObject.create('valid_description');
		expect(valueObject.isFailure).toBeFalsy();
		expect(valueObject.getResult().value).toBe('valid_description');
	});

	it('should fail with long description', ()=>{
		const valueObject = TaskDescriptionValueObject.create('invalid_description'.repeat(10));
		expect(valueObject.isFailure).toBeTruthy();
	});

	it('should fail with short description', ()=>{
		const valueObject = TaskDescriptionValueObject.create('i');
		expect(valueObject.isFailure).toBeTruthy();
	});
});
