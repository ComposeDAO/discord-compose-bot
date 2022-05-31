import { Client, Intents } from "discord.js";
import "dotenv/config";

const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export async function joined(userID: string) {
  const server = await client.guilds.fetch(GUILD_ID);

  try {
    await server.members.fetch(userID);
    return true;
  } catch (error) {
    return false;
  }
}
