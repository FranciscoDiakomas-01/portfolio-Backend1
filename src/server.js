
import express from "express";
import cors from "cors";
import db, { addProject } from "./db.js";
import authMiddleware from './middlewares/verify.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Create a new project

app.post("/projects",authMiddleware , async (req, res) => {
  const { title, description, technologies, link, repo } = req.body;
  try {
    const result = await addProject({
      title,
      description,
      technologies,
      link,
      repo,
    });
    return res.status(201).json({
      data : "created"
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao adicionar projeto" });
  }
});



// Get all projects
app.get("/projects", async (req, res) => {
  try {
    const result = await db.any("SELECT * FROM projects");
    res.json({data : result});
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

// Get a single project by ID
app.get("/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.oneOrNone("SELECT * FROM projects WHERE id = $1", [
      id,
    ]);
    if (!result) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }
    res.json(result);
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
});

// Update a project by ID
app.put("/projects/:id",authMiddleware , async (req, res) => {
  const { id } = req.params;
  const { title, description, technologies, link, repo } = req.body;
  try {
    const result = await db.one(
      "UPDATE projects SET title = $1, description = $2, tecnologies = $3, link = $4, repo = $5 WHERE id = $6 RETURNING *",
      [title, description, technologies, link, repo, id]
    );
    res.json(result);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
});

// Delete a project by ID
app.delete("/projects/:id", authMiddleware , async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.result("DELETE FROM projects WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }
    res.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
