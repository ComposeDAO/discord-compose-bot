import "dotenv/config";
import fs from "fs";
import { Client, Collection, Intents } from "discord.js";

const PREFIX = process.env.PREFIX || "?";
const GUILD_ID = process.env.GUILD_ID;
const VERIFIED_ROLE_ID = process.env.VERIFIED_ROLE_ID;
const VERIFICATION_CHANNEL_ID = process.env.VERIFICATION_CHANNEL_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();

//retrieves the command files in an array
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.on("ready", function (e) {
  console.log(`Logged in as ${client.user!.tag}!`);
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith(PREFIX)) return;

  const command = msg.content.substring(1);

  if (!client.commands.has(command)) return;

  try {
    await client.commands.get(command).execute(msg);
  } catch (error) {
    console.error();
    await msg.reply({ content: "there was an error!" });
  }
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
});

client.login(process.env.DISCORD_TOKEN);
