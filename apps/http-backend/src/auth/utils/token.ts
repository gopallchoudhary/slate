import jwt from 'jsonwebtoken';

export interface UserTokenPayloqd {
    id: string
}

export function generateToken(payload: UserTokenPayloqd) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'jwt_secret', {
        expiresIn: '1h',
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
}