import { FastifyInstance, FastifyServerOptions } from 'fastify';
import { signToken } from './service';
import { Login } from './types';

export function loginRoutes(fastify: FastifyInstance, options: FastifyServerOptions, done: CallableFunction) {
  
    fastify.post('/login', async (req, res) => {
        const user = <Login>req.body;

        const { login, password } = user;

        if (!login || !password || Object.keys(user).length !== 2) {
            res.status(403).send('Wrong login/password combination');
        } else {
            const token = await signToken(login, password);

            if (!token) {
                res.status(403).send('Wrong login/password combination');
            } else {
                res.send({token});
            }
        }
    })
 
    done()
}