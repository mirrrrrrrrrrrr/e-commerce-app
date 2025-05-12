export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const PRODUCTION = process.env.NODE_ENV === "production";

const SERVER_HOST = process.env.HOST || "localhost";
const SERVER_PORT = process.env.PORT || "8000";

export const SERVER = {
    SERVER_HOST,
    SERVER_PORT,
};
