import fastify from 'fastify';
import 'module-alias/register';
import { Logger  } from 'types-ddd';


import { signup, getUsers } from '@modules/user/infra/user.routes';

const server = fastify();

server.route(signup);
server.route(getUsers);

server.listen(3000, (_err, address) => Logger.info(`[App] Running on ${address}`));
