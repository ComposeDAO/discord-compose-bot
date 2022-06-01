import { Client, Intents } from "discord.js";
import "dotenv/config";

const GUILD_ID = process.env.GUILD_ID;
const MEMBER_ROLE_ID = process.env.MEMBER_ROLE_ID;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export async function verifyUser(userID: string) {
  const server = await client.guilds.fetch(GUILD_ID);
  let joined = false;
  let verified = false;

  try {
    await server.members.fetch(userID);
    joined = true;
  } catch (error) {
    joined = false;
  }

  if (joined) {
    //verify user
    const member = await server.members.fetch(userID);
    member.roles.add(MEMBER_ROLE_ID);
    verified = true;
  } else {
    //wait till user joins
    verified = false;
  }

  console.log(verified);
  return verified;
}

// verifyUser("979516521166569514");
