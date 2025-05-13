import { type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@db/index.js";
import { usersTable } from "@db/userSchema.js";

interface IUser {
    email: string;
    password: string;
    name: string;
    address: string;
    role: string;
}

export const register = async (req: Request, res: Response) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const data: IUser = req.body;
        data.password = await bcryptjs.hash(data.password, salt);
        const newUser = await db.insert(usersTable).values(req.body).returning({
            id: usersTable.id,
            email: usersTable.email,
            name: usersTable.name,
            address: usersTable.address,
        });

        if (newUser.length === 0) {
            res.status(404).send({ message: "User not found" });
        } else {
            res.status(201).send(newUser);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const [user] = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));
        if (!user) {
            res.status(401).send("Authentication feiled, user not found");
            return;
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).send("Authentication feiled, password not equal");
            return;
        }

        //create jwt token
        const token = jwt.sign({ id: user.id, role: user.role }, "secret", {
            expiresIn: "30d",
        });

        res.header("x-auth-token", token).send(true);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const [user] = await db.select().from(usersTable);
        // .where(eq(req.user?.id, 1));
    } catch (error) {
        res.status(500).send(error);
    }
};
