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
import { verifySeller, verifyToken } from "@middlewares/verifyToken";

const router: Router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
    "/",
    verifyToken,
    verifySeller,
    validateData(createProductSchema),
    createProduct
);
router.put(
    "/:id",
    verifyToken,
    verifySeller,
    validateData(updateProductSchema),
    updateProduct
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;
