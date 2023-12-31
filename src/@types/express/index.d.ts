import { Express, Request } from "express";
import { User } from "../middlewares/auth.middleware";

declare global {
	namespace Express {
		interface Request {
			customer: User;
		}
	}
}
