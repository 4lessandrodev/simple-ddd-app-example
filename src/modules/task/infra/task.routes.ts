import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import MarkTaskAsDoneDto from '@modules/task/application/mark-task-as-done-use-case/mark-task-as-done.dto';
import TaskModule from '@modules/task/task.module';
import auth from '@modules/auth/infra/middlewares/auth.midleware';
import CreateTaskDto from '@modules/task/application/create-task-use-case/create-task.dto';

const { service } = new TaskModule();

export const createTask: RouteOptions<any, any, any, any> = {
	method: 'POST',
	url: '/tasks',
	schema:{
		body: {
			type: 'object',
			required: ['description', 'isDone'],
			properties:{
				description: { type:'string' },
				isDone: { type: 'boolean' }
			}
		}
	},
	preHandler: auth,
	handler: async (req: FastifyRequest<{ Body: CreateTaskDto}>, res: FastifyReply) => {
		const {description,  isDone } = req.body;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const ownerId = req.userId;
		const result = await service.createTask({ description, isDone, ownerId });
		res.statusCode = result.statusCodeNumber;
		res.send(result);
	}
};

export const getTasks: RouteOptions = {
	method: 'GET',
	url: '/tasks',
	preHandler: auth,	
	handler: async (_req: FastifyRequest, res: FastifyReply) => {
		const result = await service.getTasks();
		res.send(result);
	}
};

export const doneTask: RouteOptions = {
	method: 'PUT',
	url: '/tasks/:taskId',
	preHandler: auth,
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const result = await service.doneTask(req.params as MarkTaskAsDoneDto);
		res.statusCode = result.statusCodeNumber;
		res.send(result);
	}
};
