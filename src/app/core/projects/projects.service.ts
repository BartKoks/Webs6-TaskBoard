import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Project } from '../../shared/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private dbPath = '/projects';
 
  projectsRef: AngularFireList<Project> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.projectsRef = db.list(this.dbPath);
  }

  createProject(project: Project): void {
    this.projectsRef.push(project);
  }
 
  updateProject(key: string, value: any): Promise<void> {
    return this.projectsRef.update(key, value);
  }
 
  deleteProject(key: string): Promise<void> {
    return this.projectsRef.remove(key);
  }
 
  getProjectsList(): AngularFireList<Project> {
    return this.projectsRef;
  } 
}