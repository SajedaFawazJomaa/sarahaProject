import express from "express";
import * as Messagescontroller from "./controller/Messages.controller.js";
import auth from "../../middleware/Auth.middleware.js";
import { asyncHandler } from "../../services/errorHandling.js";
const app = express();
app.post("/:receiverId", asyncHandler(Messagescontroller.sendMessage));
app.get("/", auth, asyncHandler(Messagescontroller.getMessages));

export default app;
