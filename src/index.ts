import { PORT, FRONTEND_CLIENT_URL, GUILD_ID } from "./config";
import express from "express";
import dbConnect from "./utils/dbconn.util";
import { loginToBot } from "./discord";
import { deployCommandsToGuild } from "./utils/discord.utils";
import routes from "./routes";
import cors from "cors";

const corsOptions = {
	origin: FRONTEND_CLIENT_URL,
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"ngrok-skip-browser-warning",
	],
} as cors.CorsOptions;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

dbConnect().then(() => {
	app.listen(PORT, async() => {
		console.log(`Server listening on port ${PORT}`);
		await deployCommandsToGuild(GUILD_ID);
		loginToBot();
	});
});
