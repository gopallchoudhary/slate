import { Request, Response } from "express";
import { signUpSchema, signInSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";

class AuthenticationController {
    public async signUp(req: Request, res: Response) {
        // Implement signup logic here
        const validationResult = signUpSchema.safeParse(req.body);



        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error });
        }

        const { name, email, password } = validationResult.data;
        await prisma.user.create({data: {
            name,
            email,
            password
        }})


    }

    public async signIn(req: Request, res: Response) {
        // Implement signin logic here
        const validationResult = signInSchema.safeParse(req.body);

        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error });
        }

        const { email, password } = validationResult.data;
    }
}

export default AuthenticationController