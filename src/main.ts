import fastify from 'fastify';
import 'module-alias/register';


import { signup, getUsers } from './modules/user/infra/user.routes';

const server = fastify();

server.route(signup);
server.route(getUsers);

server.listen(3000, (_err, address) => console.log(`Running on ${address}`));
