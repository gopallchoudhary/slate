import express from "express";
import { authRouter } from "./auth/routes.js";
import { roomRouter } from "./room/routes.js";
import 'dotenv/config'
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("api/v1/auth", authRouter)
app.use('api/v1/room', roomRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});