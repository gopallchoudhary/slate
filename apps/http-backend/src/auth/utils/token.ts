import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

export interface UserTokenPayloqd {
    userId: string
}

export function generateToken(payload: UserTokenPayloqd) {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h',
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET);
}