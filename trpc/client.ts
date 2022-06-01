import { createTRPCClient } from "@trpc/client";

export const client = createTRPCClient({
  url: "https://trpc-server.deno.dev/trpc",
});
