import express from "express";

import { notFound } from "./app/middlewares/notFound.js";
import router from "./app/routes/api.js";
const app = express();




// Router Implement
app.use("/api/v1", router);
//No route match
app.use(notFound);
export default app;