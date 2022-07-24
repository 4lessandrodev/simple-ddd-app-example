import fastify from 'fastify';
import 'module-alias/register';
import { Logger } from 'types-ddd';
import middie from 'middie';


import { signup, getUsers } from '@modules/user/infra/user.routes';
import { createTask, getTasks, doneTask } from '@modules/task/infra/task.routes';
import { signin, me } from '@modules/auth/infra/auth.routes';

const server = fastify();
server.register(middie);

// Public routes
server.route(signup);
server.route(signin);

// Private routes
server.route(me);
server.route(getUsers);
server.route(createTask);
server.route(getTasks);
server.route(doneTask);

server.listen(3000, (_err, address) => Logger.info(`[App]: Running on ${address}`));
