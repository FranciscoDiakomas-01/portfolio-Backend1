
import { UUID } from 'crypto';
import IProject from './../@types/Project';

export default function SeachProjectById(id : UUID, projects : IProject[]) : boolean | IProject{
    
    const index = projects.findIndex(project => {
        return project.id == id;
    })

    if (index < 0) {
        return false
    }
    return projects[index]
}

export  function SeacrhProjectbyTitle(title : string, projects : IProject[]) : boolean {
    const index = projects.findIndex(project => {
        return project.title == title;
    })
    if (index < 0) {
        return false
    }
    return true
}