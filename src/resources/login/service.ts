
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { getUserByProps } from "../users/handlers";

dotenv.config();

const SECRET = <string>process.env.SECRET_KEY;

export const signToken = async (somelogin:string, somepassword:string) => {
    const user = await getUserByProps({login: somelogin, password: somepassword});

    if (!user) {
        return null;
    } 
    const { id, login } = user;
    const token = jwt.sign({id, login}, SECRET);
    
    return token;

}