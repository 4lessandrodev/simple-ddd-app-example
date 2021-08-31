import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import SignUpDto from "../application/signup-use-case/signup.dto";
import UserModule from '../user.module';
const userModule = new UserModule();

export const signup: RouteOptions = {
	method: 'POST',
	url: '/',
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const result = await userModule.service.signup(req.body as SignUpDto);
		res.send(result);
	}
};

export const getUsers: RouteOptions = {
	method: 'GET',
	url: '/',
	handler: async (_req: FastifyRequest, res: FastifyReply) => {
		const result = await userModule.service.getUsers();
		res.send(result);
	}
};

