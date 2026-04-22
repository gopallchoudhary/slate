import { Request, Response } from "express";
import { createRoomSchema } from "@repo/common/types";
class RoomController {
    
    public async createRoom(req: Request, res: Response) {
        res.json({
            roodId: 123
        })
    }

}

export default RoomController