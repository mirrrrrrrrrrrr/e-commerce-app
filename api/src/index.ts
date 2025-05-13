import express, { type Application } from "express";
import App from "./app.js";
import { SERVER } from "@config/config.js";

const app: Application = express();
App(app);

app.listen(SERVER.SERVER_PORT, () =>
    console.log(
        `Server running on http://${SERVER.SERVER_HOST}:${SERVER.SERVER_PORT}`
    )
);
