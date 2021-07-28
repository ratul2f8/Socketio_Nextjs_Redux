import express from "express"
import { get } from "lodash"
import config from "config";
import log from "./logger";
import { Server } from "socket.io";
import { createServer } from "http";
import socket from "./socket";

const port = get(config, "port") as number;
const host = get(config, "host") as string;
const corsOrigin = get(config, "corsOrigin") as string;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    }
});

//healtcheck
app.all("/", (_, res) => res.status(200).send("Server is up!"));

httpServer.listen(port, host, () => {
    log.info(`***Server is listening on port : ${port}***`);
    socket({io})
})