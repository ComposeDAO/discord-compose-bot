import { Client, Intents } from "discord.js";
import srp from "secure-remote-password/client";
import { createTRPCClient } from "@trpc/client";
import fetch from "node-fetch";

const globalAny = global as any;
globalAny.fetch = fetch;

const GUILD_ID = `962047703699832882`;
const MEMBER_ROLE_ID = `979527100904140800`;

const trpc_client = createTRPCClient({
  url: `https://0ntdlvgj79.execute-api.us-east-1.amazonaws.com`,
});

async function serverEphemeral(
  discordHandle: string,
  clientPublicEphemeral: string
) {
  const response: { salt: string; serverPublicEphemeral: string } =
    // @ts-ignore:next-line
    await trpc_client.query("SRP-Ephemeral", {
      discordHandle: discordHandle,
      clientPublicEphemeral: clientPublicEphemeral,
    });

  return response;
}

async function serverSession(
  discordHandle: string,
  clientSessionProof: string
) {
  // @ts-ignore:next-line
  const response: string = await trpc_client.query("SRP-Session", {
    discordHandle: discordHandle,
    clientSessionProof: clientSessionProof,
  });

  return response;
}

export async function verifyUser(nym: string, userID: string) {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });
  client.login(
    `OTc5MTU2MTE5MDM5NjQzNjU4.GntQYp.uccTJ6NspIYypZrBVunQyMHgBOL7_TRz95EPws`
  );

  const server = await client.guilds.fetch(GUILD_ID);
  let joined = false;
  let verified = false;

  while (!joined) {
    try {
      await server.members.fetch(userID);
      joined = true;
    } catch (error) {
      joined = false;
    }
  }

  if (joined) {
    console.log("test logs");
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

    console.log("srp ephemeral success");

    //Send clientSession.proof to server
    //Get serverSessionProof from server
    const serverSessionProof = await serverSession(
      discordHandle,
      clientSession.proof
    );

    console.log("srp session success");

    //Verify and add role
    try {
      srp.verifySession(
        clientEphemeral.public,
        clientSession,
        serverSessionProof
      );

      await member.roles.add(MEMBER_ROLE_ID);
      verified = true;
      console.log(discordHandle + ": " + verified);
    } catch (error) {
      console.error();
      verified = false;
    }
  } else {
    //wait till user joins
    verified = false;
  }

  return verified;
}

verifyUser(
  "1bb20ce546d126dc741daa1ae90ba870019c28bb05dd753c6460016173d3864c3c52a1ce7ecaa8ce0305d498839888b5e3f7e515b3dd8b043d439902e234f2e9",
  "979516521166569514"
);
