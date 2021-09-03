import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import SignUpDto from '@modules/user/application/signup-use-case/signup.dto';
import UserModule from '@modules/user/user.module';
import auth from '@modules/auth/infra/middlewares/auth.midleware';

const { service } = new UserModule();

export const signup: RouteOptions = {
	method: 'POST',
	url: '/users',
	schema:{
		body: {
			type: 'object',
			required: ['email', 'password', 'name'],
			properties:{
				email: { type:'string' },
				password: { type:'string' },
				name: { type:'string' }
			}
		}
	},
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const result = await service.signup(req.body as SignUpDto);
		res.statusCode = result.statusCodeNumber;
		res.send(result);
	}
};

export const getUsers: RouteOptions = {
	method: 'GET',
	url: '/users',
	preHandler: auth,
	handler: async (_req: FastifyRequest, res: FastifyReply) => {
		const result = await service.getUsers();
		res.send(result);
	}
};
