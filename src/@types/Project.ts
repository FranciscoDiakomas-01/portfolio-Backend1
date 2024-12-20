import { UUID } from "crypto";

export default interface IProject {
    id: UUID,
    title: string,
    category : 'FrontEnd' | 'Backend' | 'Mobile' | 'Desktop' | 'FullStack'
    deploy: string,
    repo: string,
    description: string,
    tecnologies : string[]
}