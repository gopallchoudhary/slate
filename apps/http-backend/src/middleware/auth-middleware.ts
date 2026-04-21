import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth/utils/token.js";

export function authenticationMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = header.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        try {
            const decoded = verifyToken(token);

            //@ts-ignore
            req.userId = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}