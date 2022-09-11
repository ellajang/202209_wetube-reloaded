import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload } from "../controllers/videoController"; 

const videoRouther = express.Router();

videoRouther.get("/:id(\\d+)",watch);
videoRouther.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouther.route("/upload").get(getUpload).post(postUpload);
export default videoRouther;