import { type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "@db/index";
import { productsTable } from "@db/productSchema";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await db.select().from(productsTable);

        if (products.length === 0) {
            res.status(404).send({ message: "Products not found" });
        } else {
            res.status(200).send(products);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const [product] = await db
            .select()
            .from(productsTable)
            .where(eq(productsTable.id, +req.params.id));

        if (!product) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await db
            .insert(productsTable)
            .values(req.body)
            .returning();

        if (newProduct.length === 0) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(201).send(newProduct);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const [updatedProduct] = await db
            .update(productsTable)
            .set(req.body)
            .where(eq(productsTable.id, +req.params.id))
            .returning();

        if (!updatedProduct) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(200).send(updatedProduct);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const [deletedProduct] = await db
            .delete(productsTable)
            .where(eq(productsTable.id, +req.params.id))
            .returning();

        if (!deletedProduct) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(200).send(deletedProduct);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
