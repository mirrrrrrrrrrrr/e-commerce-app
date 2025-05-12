import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from "./product.controller";
import { validateData } from "@middlewares/validationMiddleware";
import {
    createProductSchema,
    updateProductSchema,
} from "@schemas/productSchemas";

const router: Router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validateData(createProductSchema), createProduct);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
