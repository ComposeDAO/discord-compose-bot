import "dotenv/config";
import { Client, Intents } from "discord.js";

// Instantiate a new client with some necessary parameters.
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Notify progress
client.on("ready", function (e) {
  // @ts-ignore:next-line
  console.log(`Logged in as ${client.user.tag}!`);
});
// Authenticate
client.login(process.env.DISCORD_TOKEN);

//Example Functionality
client.on("message", function (msg) {
  if (msg.content === "hello") {
    msg.reply("Hello yourself!");
  }
});
