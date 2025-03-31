import dotenv from "dotenv";
dotenv.config();
import path from "path";

dotenv.config({ path: path.resolve("config", "config.env") });

console.log("SMTP_MAIL:", process.env.SMTP_MAIL);
console.log("SMTP_PASSWORD:", process.env.SMTP_PASSWORD);
