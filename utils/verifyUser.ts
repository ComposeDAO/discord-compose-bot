import { Client, Intents } from "discord.js";
import srp from "secure-remote-password/client";
import "dotenv/config";
import { serverEphemeral, serverSession } from "../trpc/client";

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
    const clientEphemeral = srp.generateEphemeral();
    const username = "";

    //Send discordHandle and clientEphemeral to server
    //Get salt and serverPublicEphemeral from server
    const serverResult = await serverEphemeral(
      discordHandle,
      clientEphemeral.public
    );
    const salt = serverResult.salt;
    const serverPublicEphemeral = serverResult.serverPublicEphemeral;

    const privateKey = srp.derivePrivateKey(salt, username, nym);
    const clientSession = srp.deriveSession(
      clientEphemeral.secret,
      serverPublicEphemeral,
      salt,
      username,
      privateKey
    );

    //Send clientSession.proof to server
    //Get serverSessionProof from server
    const serverSessionProof = await serverSession(
      discordHandle,
      clientSession.proof
    );

    //Verify and add role
    try {
      srp.verifySession(
        clientEphemeral.public,
        clientSession,
        serverSessionProof
      );

      await member.roles.add(MEMBER_ROLE_ID);
      verified = true;
    } catch (error) {
      verified = false;
    }
  } else {
    //wait till user joins
    verified = false;
  }

  console.log(verified);
  return verified;
}
