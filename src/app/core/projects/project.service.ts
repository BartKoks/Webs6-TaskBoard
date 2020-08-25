import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Project } from '../../shared/model/project'
import { ProjectUser } from '../../shared/model/project-user'
import { User } from '../../shared/model/user'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private fire: AngularFirestore) {
  }

  getProjects() {
    return this.fire.collection('project', ref => ref.where('archived','==', false)).valueChanges({ idField: 'key' });
  }

  getArchivedProjects() {
    return this.fire.collection('project', ref => ref.where('archived','==', true)).valueChanges({ idField: 'key' });
  }

  getProject(projectKey: string) {
    return this.fire.collection('project').doc(projectKey).valueChanges();
  }

  createProject(project: Project, owner: User) {
    this.fire.collection('project').add(project).then(item => {
      const newProjectId = item.id

      console.log(item.id);
      let projectUser: ProjectUser = {
        project: project,
        user: owner,
        role: "Eigenaar",
        projectKey: newProjectId
      };
      this.fire.collection('project-user').add(projectUser);
    });
    
  }

  updateProject(key: string, project: Project) {
    this.fire.doc('project/' + key).update(project);
   }

  archive(project: Project) {
    this.fire.doc('project/' + project.key).update(project);
  }
}
