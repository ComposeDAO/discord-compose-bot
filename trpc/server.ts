import * as trpc from "@trpc/server";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const appRouter = trpc.router().query("hello", {
  resolve() {
    return `Hello World!`;
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
