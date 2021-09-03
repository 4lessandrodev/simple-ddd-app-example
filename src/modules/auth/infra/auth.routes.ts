import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import SignInDto from '@modules/auth/application/signin-use-case/signin.dto';
import AuthModule from '@modules/auth/auth.module';
import auth from '@modules/auth/infra/middlewares/auth.midleware';

const { service } = new AuthModule();

export const signin: RouteOptions = {
	method: 'POST',
	url: '/auth',
	schema:{
		body: {
			type: 'object',
			required: ['email', 'password'],
			properties:{
				email: { type:'string' },
				password: { type:'string' }
			}
		}
	},
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const result = await service.signin(req.body as SignInDto);
		if (result.isSuccess) {
			return res.send({ token: result.getResult().token });
		}
		res.statusCode = result.statusCodeNumber;
		res.send(result);
	}
};

export const me: RouteOptions = {
	method: 'GET',
	url: '/auth',
	preHandler: auth,
	handler: async (req: FastifyRequest, res: FastifyReply) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
		const useId = req.userId;
		const result = await service.getUserById(useId);
		res.send(result);
	}
};
