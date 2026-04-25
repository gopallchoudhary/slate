import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config'
const wss = new WebSocketServer({ port: 8080 });
import { prisma } from "@repo/db/client";
interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (typeof decoded === "string") {
        return null
    }
    if (!decoded || !(decoded as JwtPayload).userId) {
        return null
    }
    return (decoded as JwtPayload).userId
}

wss.on("connection", (ws, req) => {
    const url = req.url;

    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token") ?? "";

    const userId = checkUser(token);
    if (!userId) {
        ws.close(401, "Unauthorized");
        return;
    }

    users.push({
        ws,
        rooms: [],
        userId
    })



    ws.on("message", async (data) => {
        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
        }

        //. join room 
        if (parsedData.type === "join_room") {
            const roomId = parsedData.roomId;
            if (!users.find(user => user.rooms.includes(roomId))) {
                users.find(user => user.ws === ws)?.rooms.push(roomId);
            }
        }

        //. leave room 
        if (parsedData.type === "leave_room") {
            const roomId = parsedData.roomId;
            const user = users.find(user => user.ws === ws)
            if (!user) {
                return
            }

            user.rooms = user.rooms.filter(id => id !== roomId);
        }

        //. send chat message 
        if (parsedData.type === 'chat') {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            await prisma.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    userId
                }
            })

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }


    });
});

