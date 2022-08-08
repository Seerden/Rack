import cors from "cors";
import "dotenv/config";
import express, { RequestHandler } from "express";
import { indexRouter } from "./src/routers/index-router";

/** Configure Express server and start listening for requests. */
async function startServer() {
   const app = express();

   app.use(
      cors({
         origin: true, // Could also use client domain (in dev: http://localhost:3000)
         credentials: true,
      })
   );

   app.use(
      express.urlencoded({
         limit: "5mb",
         parameterLimit: 10000,
         extended: true,
      }) as RequestHandler
   );

   app.use(express.json() as RequestHandler);

   app.use("/", indexRouter);

   const port = process.env.PORT || 5000;

   app.listen(port, () => {
      console.log(`Express server started on port ${port} at ${new Date()}`);
   });
}

startServer();
