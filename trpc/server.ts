import * as trpc from "@trpc/server";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { z } from "zod";
import cors from "cors";
import { joined } from "../utils/joined";
import { verifyUser } from "../utils/verifyUser";

const appRouter = trpc
  .router()
  .query("isJoined", {
    input: z.string(),
    resolve: async ({ input }) => {
      const isJoined = await joined(input);
      return isJoined;
    },
  })
  .query("verifyDiscordUser", {
    input: z.string(),
    resolve: async ({ input }) => {
      const isVerified = await verifyUser(input);
      return isVerified;
    },
  });

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 8081;

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
