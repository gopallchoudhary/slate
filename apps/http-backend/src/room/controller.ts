import { Request, Response } from "express";
import { createRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
class RoomController {

    public async createRoom(req: Request, res: Response) {
        const parsedRoomDate = createRoomSchema.safeParse(req.body);
        if (parsedRoomDate.error) {
            return res.status(400).json({ error: parsedRoomDate.error });
        }
        const { name, description } = parsedRoomDate.data;

        const room = await prisma.room.create({
            data: {
                slug: name,
                adminId: '2339'
            },
        });


    }

    public async getChats(req: Request, res: Response) {
        const roomId = req.params.roomId;
        const chats = await prisma.chat.findMany({
            where: {
                roomId: Number(roomId)
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });
        return res.status(200).json(chats);
    }

}
export default RoomController