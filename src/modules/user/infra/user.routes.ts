import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import {UserRepository} from '../infra/database/user.repository';
import Database from './database/memory.db';
import { UserMapper } from './mappers/user.mapper';
import { SignUpUseCase } from '../application/signup-use-case/signup.use-case';
import SignUpDto from "../application/signup-use-case/signup.dto";

export const signup: RouteOptions = {
	method: 'POST',
	url: '/',
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const database = new Database();
		const mapper = new UserMapper();
		const repo = new UserRepository(database, mapper);
		const useCase = new SignUpUseCase(repo);
		const result = await useCase.execute(req.body as SignUpDto);
		res.send(result);
	}
};

export default signup;
