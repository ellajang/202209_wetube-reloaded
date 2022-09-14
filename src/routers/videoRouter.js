import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController"; 
import { protectorMiddleware, videoUpload } from "../middlewares";

const videoRouther = express.Router();

videoRouther.get("/:id([0-9a-f]{24})",watch);
videoRouther.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouther.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouther.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"),postUpload);
export default videoRouther;