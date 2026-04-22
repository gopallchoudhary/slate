import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config'
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
    const url = req.url;

    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token") ?? "";

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || !(decoded as JwtPayload).userId) {
        ws.close(4001, "Unauthorized");
        return;
    }



    ws.on("message", (message) => {
        console.log("Message received", message);
        ws.send("Message received")
    });
});

