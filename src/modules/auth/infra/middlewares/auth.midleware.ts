import { FastifyRequest, FastifyReply } from 'fastify';
import AuthModule from '@modules/auth/auth.module';
import { Result } from 'types-ddd';
const { service } = new AuthModule();

export const auth = async (req: FastifyRequest, res: FastifyReply) => {
	const existsAuthorization = req.headers.authorization?.includes('Bearer ');

	if (!existsAuthorization || typeof existsAuthorization === 'undefined') {
		res.statusCode = 401;
		return res.send(Result.fail('[Auth]: Invalid Token', 'UNAUTHORIZED'));
	}

	const existsToken = req.headers.authorization?.split(' ')[1];

	if(typeof existsToken !== 'string') {
		res.statusCode = 401;
		return res.send(Result.fail('[Auth]: Invalid Token', 'UNAUTHORIZED'));
	}

	const token = existsToken;
	const canAccess = await service.authorize(token ?? '');

	if (canAccess.isFailure) {
		res.statusCode = 401;
		return res.send(Result.fail(canAccess.errorValue(), 'UNAUTHORIZED'));
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	req.userId = canAccess.getResult().userId.toString();
};

export default auth;
