import express from "express";
import cors from "cors";
import VerifyPassWord from "./middleware/verifyPassword";
import {createProject,deleteById,getProjectById,getProjects,Update,} from "./db";
import { UUID } from "node:crypto";
import isAvailableProject from "./services/isAProjects";

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.get("/projects", (req, res) => {
  const data = getProjects();
  res.json({ data: data });
});

server.get("/project/:id", (req, res) => {
  const id = String(req.params.id) as UUID;
  const data = getProjectById(id);
  res.json({ data: data });
});

server.delete("/project/:id", VerifyPassWord ,  (req, res) => {
  const id = String(req.params.id) as UUID;
  const data = deleteById(id);
  res.json({ data: data });
});

server.post("/project", VerifyPassWord , (req, res) => {
  const validation = isAvailableProject(req.body);
  if (validation) {
    const result = createProject(req.body);
    res.status(result == "already exist" ? 400 : 201).json({ data: result });
    return;
  } else {
    res.status(400).json({ body: req.body, error: "invalid project" });
  }
});

server.put("/project/:id", VerifyPassWord ,(req, res) => {
  const id = String(req.params.id) as UUID;
  const validation = isAvailableProject(req.body);
  if (validation) {
    const result = Update(id, req.body);
    res
      .status(result == "empty list" ? 200 : result == "updated" ? 201 : 400)
      .json({
        result,
      });
    return;
  } else {
    res.status(400).json({ body: req.body, error: "invalid project" });
  }
});

server.listen(port, () => {
  console.log("server running!");
});
