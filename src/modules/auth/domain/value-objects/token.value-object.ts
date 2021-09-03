import PayloadValueObject from '@modules/auth/domain/value-objects/payload.value-object';
import { JWT_SECRET, JWT_EXPIRATION_IN_HOURS } from '@config/secret';
import { ValueObject, Result } from 'types-ddd';
import Jwt from 'jsonwebtoken';

export interface TokenProp {
	token: string;
}

export class TokenValueObject extends ValueObject<TokenProp>{
	private userId: string | undefined;
	private constructor (props: TokenProp){
		super(props);
		this.userId = undefined;
	}

	get value () {
		return this.props.token;
	}

	addPayload (payload: PayloadValueObject):TokenValueObject {
		this.userId = payload.value.toString();
		return this;
	}

	sign (): void {
		this.props.token = Jwt.sign({ 
			userId: this.userId
		}, JWT_SECRET, 
		{ expiresIn: `${JWT_EXPIRATION_IN_HOURS}h` }
		);
	}

	verify ():Result<PayloadValueObject> {
		try {
			const decoded:any = Jwt.verify(this.props.token, JWT_SECRET);
			return PayloadValueObject.create(decoded.userId);
		} catch (error) {
			return Result.fail('[TokenValueObject]: Invalid or Expired Token');
		}
	}

	public static create (token?: string): Result<TokenValueObject>{
		return Result.ok(new TokenValueObject({ token: token ?? '' }));
	}
}

export default TokenValueObject;
