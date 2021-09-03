import { ValueObject, Result, UniqueEntityID } from 'types-ddd';
const regexUUID = /^[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}/;

export interface PayloadProp {
	userId: UniqueEntityID;
}

export class PayloadValueObject extends ValueObject<PayloadProp>{
	private constructor (props: PayloadProp){
		super(props);
	}

	get value ():UniqueEntityID {
		return this.props.userId;
	}

	public static isValidUUID (value: string):boolean{
		return regexUUID.test(value);
	}

	public static create (value: UniqueEntityID): Result<PayloadValueObject>{
		const isValidValue = PayloadValueObject.isValidUUID(value.toString());

		if(!isValidValue) {
			return Result.fail('[PayloadValueObject]: Invalid uuid For User');
		}

		return Result.ok(new PayloadValueObject({ userId: value}));
	}
}

export default PayloadValueObject;
