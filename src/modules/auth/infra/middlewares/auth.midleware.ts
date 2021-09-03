import { FastifyRequest, FastifyReply } from 'fastify';
import AuthModule from '@modules/auth/auth.module';
import { Result } from 'types-ddd';
const { service } = new AuthModule();

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
	const existsAuthorization = request.headers.authorization?.includes('Bearer ');

	if (!existsAuthorization || typeof existsAuthorization === 'undefined') {
		reply.statusCode = 403;
		return reply.send(Result.fail('Invalid token', 'UNAUTHORIZED'));
	}

	const existsToken = request.headers.authorization?.split(' ')[1];

	if(typeof existsToken !== 'string') {
		reply.statusCode = 403;
		return reply.send(Result.fail('Invalid token', 'UNAUTHORIZED'));
	}

	const token = existsToken;
	const canAccess = await service.authorize(token ?? '');

	if (canAccess.isFailure) {
		reply.statusCode = 403;
		return reply.send(Result.fail('Invalid token', 'UNAUTHORIZED'));
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	request.userId = canAccess.getResult().userId.toString();
};

export default auth;
