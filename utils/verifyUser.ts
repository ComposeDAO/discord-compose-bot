import { Client, Intents } from "discord.js";
import "dotenv/config";

const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export async function verifyUser(userID: string) {}
