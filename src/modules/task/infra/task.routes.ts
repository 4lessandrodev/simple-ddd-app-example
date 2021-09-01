import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import CreateTaskDto from '@modules/task/application/create-task-use-case/create-task.dto';
import TaskModule from '@modules/task/task.module';
const { service } = new TaskModule();

export const createTask: RouteOptions = {
	method: 'POST',
	url: '/tasks',
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const result = await service.createTask(req.body as CreateTaskDto);
		res.send(result);
	}
};

export const getTasks: RouteOptions = {
	method: 'GET',
	url: '/tasks',
	handler: async (_req: FastifyRequest, res: FastifyReply) => {
		const result = await service.getTasks();
		res.send(result);
	}
};
