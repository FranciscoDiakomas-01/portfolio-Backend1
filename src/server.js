"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/middleware/verifyPassword.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function VerifyPassWord(req, res, next) {
  try {
    const password = String(req.headers["authorization"]);
    if (password == String(process.env.PASSWORD)) {
      next();
      return;
    } else {
      res.status(400).json({
        error: "wrong password"
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// src/db.ts
var import_node_fs = __toESM(require("fs"));

// src/services/search.ts
function SeachProjectById(id, projects) {
  const index = projects.findIndex((project) => {
    return project.id == id;
  });
  if (index < 0) {
    return false;
  }
  return projects[index];
}
function SeacrhProjectbyTitle(title, projects) {
  const index = projects.findIndex((project) => {
    return project.title == title;
  });
  if (index < 0) {
    return false;
  }
  return true;
}

// src/db.ts
function getProjects() {
  let Projects = [];
  try {
    return JSON.parse(import_node_fs.default.readFileSync(process.cwd() + "/database/db.json").toString());
  } catch (error) {
    return [];
  }
}
function getProjectById(id) {
  try {
    const Projcts = JSON.parse(import_node_fs.default.readFileSync(process.cwd() + "/database/db.json").toString());
    const project = SeachProjectById(id, Projcts);
    return project;
  } catch (error) {
    return [];
  }
}
function createProject(project) {
  try {
    let Projcts = JSON.parse(import_node_fs.default.readFileSync(process.cwd() + "/database/db.json").toString());
    const isInList = SeacrhProjectbyTitle(project.title, Projcts);
    if (isInList) {
      return "already exist";
    }
    Projcts.push(project);
    let content = "";
    Projcts.forEach((pro, index) => {
      const project2 = `
            {
                "id": "${crypto.randomUUID()}",
                "title": "${pro.title}",
                "deploy": "${pro.deploy}",
                "category" : "${pro.category}",
                "repo": "${pro.repo}",
                "description": "${pro.description}",
                "tecnologies" : ${JSON.stringify(pro.tecnologies)}
            }`;
      if (index == Projcts.length - 1) {
        content += project2 + "\n";
        return;
      }
      content += project2 + ",";
    });
    import_node_fs.default.writeFileSync(process.cwd() + "/database/db.json", `[ ${content} ]`);
    return "created";
  } catch (error) {
    const fistProject = `
            {
                "id": "${crypto.randomUUID()}", 
                "title": "${project.title}",
                "deploy": "${project.deploy}",
                "category" : "${project.category}",
                "repo": "${project.repo}",
                "description": "${project.description}",
                "tecnologies" : ${JSON.stringify(project.tecnologies)}
            }`;
    import_node_fs.default.writeFileSync(process.cwd() + "/database/db.json", `[ ${fistProject} 
]`);
    return "created";
  }
}
function Update(id, data) {
  try {
    let Projcts = JSON.parse(
      import_node_fs.default.readFileSync(process.cwd() + "/database/db.json").toString()
    );
    let project = Projcts.find((pro) => {
      return pro.id == id;
    });
    if (project == void 0 || project == null) {
      return "not found";
    }
    project.repo = data.repo;
    project.title = data.title;
    project.description = data.description;
    project.deploy = data.deploy;
    project.tecnologies = data.tecnologies;
    let content = "";
    Projcts.forEach((pro, index) => {
      const project2 = `
            {
                "id": "${pro.id}",
                "title": "${pro.title}",
                "deploy": "${pro.deploy}",
                "category" : "${pro.category}",
                "repo": "${pro.repo}",
                "description": "${pro.description}",
                "tecnologies" : ${JSON.stringify(pro.tecnologies)}
            }`;
      if (index == Projcts.length - 1) {
        content += project2 + "\n";
        return;
      }
      content += project2 + ",";
    });
    import_node_fs.default.writeFileSync(process.cwd() + "/database/db.json", `[ ${content} ]`);
    return "updated";
  } catch (error) {
    return "empty list";
  }
}
function deleteById(id) {
  try {
    const Projcts = JSON.parse(import_node_fs.default.readFileSync(process.cwd() + "/database/db.json").toString());
    const project = SeachProjectById(id, Projcts);
    if (project) {
      const index = Projcts.findIndex((pro) => {
        return pro.id == id;
      });
      Projcts.splice(index, 1);
      let content = "";
      Projcts.forEach((pro, index2) => {
        const project2 = `
            {
                "id": "${pro.id}",
                "title": "${pro.title}",
                "deploy": "${pro.deploy}",
                "category" : "${pro.category}",
                "repo": "${pro.repo}",
                "description": "${pro.description}",
                "tecnologies" : ${JSON.stringify(pro.tecnologies)}
            }`;
        if (index2 == Projcts.length - 1) {
          content += project2 + "\n";
          return;
        }
        content += project2 + ",";
      });
      import_node_fs.default.writeFileSync(process.cwd() + "/database/db.json", `[ ${content} ]`);
      return "deleted";
    }
    return "not found";
  } catch (error) {
    return "empty list";
  }
}

// src/services/isAProjects.ts
var import_validator = __toESM(require("validator"));
function isAvailableProject(project) {
  try {
    if (project.title.length >= 2 && project.description.length <= 170 && project.description.length >= 2 && import_validator.default.isURL(project.repo) && project.category) {
      if (project.deploy && !import_validator.default.isURL(project.deploy)) {
        return false;
      }
      const empty = project.tecnologies.some((tec) => {
        return isEmpty(tec);
      });
      if (!empty) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}
function isEmpty(str) {
  return str.length == 0;
}

// src/server.ts
var server = (0, import_express.default)();
var port = process.env.PORT || 8e3;
server.use(import_express.default.json());
server.use((0, import_cors.default)());
server.use(import_express.default.urlencoded({ extended: true }));
server.get("/projects", (req, res) => {
  const data = getProjects();
  res.json({ data });
});
server.get("/project/:id", (req, res) => {
  const id = String(req.params.id);
  const data = getProjectById(id);
  res.json({ data });
});
server.delete("/project/:id", VerifyPassWord, (req, res) => {
  const id = String(req.params.id);
  const data = deleteById(id);
  res.json({ data });
});
server.post("/project", VerifyPassWord, (req, res) => {
  const validation = isAvailableProject(req.body);
  if (validation) {
    const result = createProject(req.body);
    res.status(result == "already exist" ? 400 : 201).json({ data: result });
    return;
  } else {
    res.status(400).json({ body: req.body, error: "invalid project" });
  }
});
server.put("/project/:id", VerifyPassWord, (req, res) => {
  const id = String(req.params.id);
  const validation = isAvailableProject(req.body);
  if (validation) {
    const result = Update(id, req.body);
    res.status(result == "empty list" ? 200 : result == "updated" ? 201 : 400).json({
      result
    });
    return;
  } else {
    res.status(400).json({ body: req.body, error: "invalid project" });
  }
});
server.listen(port, () => {
  console.log("server running!");
});
