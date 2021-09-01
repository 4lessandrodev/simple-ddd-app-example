import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import SignUpDto from '@modules/user/application/signup-use-case/signup.dto';
import UserModule from '@modules/user/user.module';
const { service } = new UserModule();

export const signup: RouteOptions = {
	method: 'POST',
	url: '/users',
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const result = await service.signup(req.body as SignUpDto);
		res.send(result);
	}
};

export const getUsers: RouteOptions = {
	method: 'GET',
	url: '/users',
	handler: async (_req: FastifyRequest, res: FastifyReply) => {
		const result = await service.getUsers();
		res.send(result);
	}
};
