import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from 'fastify';

dotenv.config();

const SECRET = <string>process.env.SECRET_KEY;

export const checkToken = async (req: FastifyRequest, res: FastifyReply) => {

    const authHeader = req.headers.authorization;

    if (authHeader !== undefined) {
        const tokenStr = req.headers.authorization;
        if (tokenStr) {
            const [type, token] = tokenStr.split(' ');

            if (type !== 'Bearer') {
                res.status(401).send('Unauthorized user');
            } else {
                try {
                    jwt.verify(token, SECRET);
                } catch(e) {
                    res.status(401).send('Unauthorized user');
                }
            }
        } else {
            res.status(401).send('Unauthorized user');
        }
    } else {
        res.status(401).send('Unauthorized user');
    }
}