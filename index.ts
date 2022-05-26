import "dotenv/config";
import fs from "fs";
// import { Client, Collection, Intents } from "discord.js";
import { Client, Collection, Intents } from "discord.js";

const prefix = process.env.PREFIX || "?";
const GUILD_ID = process.env.GUILD_ID;
const VERIFIED_ROLE_ID = process.env.VERIFIED_ROLE_ID;
const VERIFICATION_CHANNEL_ID = process.env.VERIFICATION_CHANNEL_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();

client.on("ready", function (e) {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
});

client.login(process.env.DISCORD_TOKEN);
