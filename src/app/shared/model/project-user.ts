import { Project } from './project';
import { User } from './user';

export class ProjectUser {
    projectKey: string;
    project: Project;
    user: User;
    role: string;
}