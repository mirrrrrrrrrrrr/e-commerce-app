import { type Application, json, urlencoded } from "express";
import productRouter from "@routes/products/";

function App(app: Application) {
    // core middlewares
    app.use(urlencoded({ extended: true }));
    app.use(json());

    // routes
    app.use("/api/products", productRouter);
}

export default App;
