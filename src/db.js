
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();

const pgp = pgPromise({});
const db = pgp(process.env.DB_URL);
export const addProject = async (project) => {
  const { title, description, technologies, link, repo } = project;
  try {
    const result = await db.one(
      "INSERT INTO projects (title, description, technologies, deploy, repo) VALUES ($1, $2, $3, $4, $5);",
      [title, description, technologies, link, repo]
    );
  } catch (error) {
    return error
  }
};

export default db;
