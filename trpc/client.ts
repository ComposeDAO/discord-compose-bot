import { createTRPCClient } from "@trpc/client";
import fetch from "node-fetch";

const globalAny = global as any;
globalAny.fetch = fetch;

export const client = createTRPCClient({
  url: "https://0ntdlvgj79.execute-api.us-east-1.amazonaws.com",
});

export async function serverEphemeral(
  discordHandle: string,
  clientPublicEphemeral: string
) {
  const response: { salt: string; serverPublicEphemeral: string } =
    // @ts-ignore:next-line
    await client.query("SRP-Ephemeral", {
      discordHandle: discordHandle,
      clientPublicEphemeral: clientPublicEphemeral,
    });

  return response;
}

export async function serverSession(
  clientSessionProof: string,
  discordHandle: string
) {
  // @ts-ignore:next-line
  const response: string = await client.query("SRP-Session", {
    discordHandle: discordHandle,
    clientSessionProof: clientSessionProof,
  });

  return response;
}
