import { Client, Intents } from "discord.js";
import srp from "secure-remote-password/client";
import "dotenv/config";

const GUILD_ID = process.env.GUILD_ID;
const MEMBER_ROLE_ID = process.env.MEMBER_ROLE_ID;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export async function verifyUser(nym: string, userID: string) {
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
    //Get member's discord handle
    const member = await server.members.fetch(userID);
    const discordHandle = member.user.username;

    //
    const clientEphemeral = srp.generateEphemeral();

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
