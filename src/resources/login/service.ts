
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { getUserByProps } from "../users/handlers";
import { checkPassword } from './hashHelper';

dotenv.config();

const SECRET = <string>process.env.SECRET_KEY;

export const signToken = async (somelogin:string, password: string) => {
    const user = await getUserByProps(somelogin);

    if (!user) {
        return null;
    } 
    const { password: hashedPassword} = user;
    if (hashedPassword) {
        const isSimilar = await checkPassword(password, hashedPassword);
        if (isSimilar) {
            const { id, login } = user;
            const token = jwt.sign({id, login}, SECRET); 
            return token;
        }
    }
    return null;
}