import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import CreateTaskDto from '@modules/task/application/create-task-use-case/create-task.dto';
import MarkTaskAsDoneDto from '@modules/task/application/mark-task-as-done-use-case/mark-task-as-done.dto';
import TaskModule from '@modules/task/task.module';
const { service } = new TaskModule();

export const createTask: RouteOptions = {
	method: 'POST',
	url: '/tasks',
	schema:{
		body: {
			type: 'object',
			required: ['ownerId', 'description', 'isDone'],
			properties:{
				ownerId: { type:'string' },
				description: { type:'string' },
				isDone: { type: 'boolean' }
			}
		}
	},
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

export const doneTask: RouteOptions = {
	method: 'PUT',
	url: '/tasks/:taskId',
	handler: async (req: FastifyRequest, res: FastifyReply) => {
		const result = await service.doneTask(req.params as MarkTaskAsDoneDto);
		res.send(result);
	}
};
