import { type Application, json, urlencoded } from "express";
import productRouter from "@routes/products/index.js";
import authRouter from "@routes/auth/index.js";

function App(app: Application) {
    // core middlewares
    app.use(urlencoded({ extended: true }));
    app.use(json());

    // routes
    app.get("/", (req, res) => {
        res.send(`
            <h1>Hello World</h1>
            <p>Go to API page:
            <ul>
                <li><a href="http://localhost:8080/api/products">Products</a></li>
            </ul>
            `);
    });

    app.use("/api/products", productRouter);
    app.use("/api/auth", authRouter);
}

export default App;
