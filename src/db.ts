import { UUID } from 'node:crypto';
import fs from 'node:fs'
import IProject from './@types/Project';
import SeachProjectById, { SeacrhProjectbyTitle } from './services/search';


export  function getProjects() {
    let Projects = []
    try {
         return JSON.parse(fs.readFileSync(process.cwd() + "/database/db.json").toString())
    } catch (error) {
        return []
    }
   
}

export function getProjectById(id: UUID) {
    try {
        const Projcts: IProject[] = JSON.parse(fs.readFileSync(process.cwd() + "/database/db.json").toString());
        const project = SeachProjectById(id , Projcts)
        return project
    } catch (error) {
        return []
    }
    
}

export function createProject(project: IProject) {
    try {
        //caso ja exista algum projecto ele vai ser JSON
        let Projcts: IProject[] = JSON.parse(fs.readFileSync(process.cwd() + "/database/db.json").toString());
        const isInList = SeacrhProjectbyTitle(project.title, Projcts)
        if (isInList) {
            return "already exist"
        }
        Projcts.push(project)
        let content = ""
        Projcts.forEach((pro, index) => {
            const project = `
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
                content += project + "\n";
                return
            }
            content += project + ","
        })
        fs.writeFileSync(process.cwd() + "/database/db.json", `[ ${content} ]`);
        return 'created'
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
        fs.writeFileSync(process.cwd() + "/database/db.json", `[ ${fistProject} \n]`);
        
        return "created";
    }
    
}


export function Update(id : UUID , data : IProject) {
  try {
    let Projcts: IProject[] = JSON.parse(
      fs.readFileSync(process.cwd() + "/database/db.json").toString()
    );
   
    let project = Projcts.find(pro => {
        return pro.id == id
    })
    if (project == undefined || project == null) {
        return "not found"
      }
      
    // não deu pra desestruturar 😁 project = { ...data };
    project.repo = data.repo
    project.title = data.title;
    project.description = data.description;
    project.deploy = data.deploy;
    project.tecnologies = data.tecnologies
      let content = ""
        Projcts.forEach((pro , index) => {
            const project = `
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
                content += project + "\n";
                return
            }
            content += project + ","
        })
        fs.writeFileSync(process.cwd() + "/database/db.json", `[ ${content} ]`);
    return "updated"
  } catch (error) {
    return "empty list";
  }
}

export function deleteById(id: UUID) {
    try {
        const Projcts: IProject[] = JSON.parse(fs.readFileSync(process.cwd() + "/database/db.json").toString());
        const project = SeachProjectById(id, Projcts)
        if (project) {
            
            const index = Projcts.findIndex(pro => {
                return pro.id == id
            })
            Projcts.splice(index, 1)
             let content = ""
            Projcts.forEach((pro , index) => {
            const project = `
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
                content += project + "\n";
                return
            }
            content += project + ","
        })
        fs.writeFileSync(process.cwd() + "/database/db.json", `[ ${content} ]`);
            return 'deleted'
        }
        return 'not found'
    } catch (error) {
        return "empty list";
    }
    
}