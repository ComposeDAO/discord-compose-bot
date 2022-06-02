import { createTRPCClient } from "@trpc/client";

export const client = createTRPCClient({
  url: "https://0ntdlvgj79.execute-api.us-east-1.amazonaws.com",
});

export async function serverEphemeral(
  discordHandle,
  clientEphemeralPublic: string
) {
  const response: { salt: string; serverEphemeralPublic: string } =
    // @ts-ignore:next-line
    await client.query("SRP-Ephemeral", {
      discordHandle: discordHandle,
      clientEphemeralPublic: clientEphemeralPublic,
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
