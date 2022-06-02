import { createTRPCClient } from "@trpc/client";

export const client = createTRPCClient({
  url: "https://0ntdlvgj79.execute-api.us-east-1.amazonaws.com",
});

export async function serverEphemeral(
  discordHandle: string,
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

export async function serverSession(clientSessionProof: string) {
  // @ts-ignore:next-line
  const response: string = await client.query("SRP-Session", {
    clientSessionProof: clientSessionProof,
  });

  return response;
}
