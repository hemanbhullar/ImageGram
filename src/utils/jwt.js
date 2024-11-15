import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

 //Verify that token
 export const verifyJWT = (token)  => {
    return jwt.verify(token, JWT_SECRET);
}