import IProject from "../@types/Project";
import validator from 'validator'

export default function isAvailableProject(project : IProject) : boolean {
    //validaçao
    try {
        
        if (project.title.length >= 2 && project.description.length <= 170 && project.description.length >= 2 && validator.isURL(project.repo) && project.category) {
            
            if (project.deploy && !validator.isURL(project.deploy)) {
                return false
            }
            //validation tecnologies
            const empty = project.tecnologies.some(tec => {
                return isEmpty(tec)
            })
            if (!empty) {
                return true
            } else {
                return false
            }
        }
        return false;
    } catch (error) {
            
        return false
    }
}
export function isEmpty(str: string) {
    return str.length == 0
}