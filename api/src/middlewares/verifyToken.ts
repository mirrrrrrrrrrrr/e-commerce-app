import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("x-auth-token");

    if (!token) {
        res.status(401).json({ error: "Access denied!" });
        return;
    }

    try {
        const decoded = jwt.verify(token, "secret") as jwt.JwtPayload;
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };
        next();
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const verifySeller = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const role = req.user?.role;
    if (role !== "seller") {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    next();
};
