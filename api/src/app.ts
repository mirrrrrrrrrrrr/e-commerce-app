import { type Application, json, urlencoded } from "express";
import productRouter from "@routes/products/";
import authRouter from "@routes/auth";

function App(app: Application) {
    // core middlewares
    app.use(urlencoded({ extended: true }));
    app.use(json());

    // routes
    app.use("/api/products", productRouter);
    app.use("/api/auth", authRouter);
}

export default App;
