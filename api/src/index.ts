import express, { type Application } from "express";
import App from "./app";
import { SERVER } from "@config/config";

const app: Application = express();
App(app);

const PORT = SERVER.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
