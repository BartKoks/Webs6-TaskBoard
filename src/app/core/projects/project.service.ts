import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Project } from '../../shared/model/project'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private fire: AngularFirestore) {
  }

  getProjects() {
    return this.fire.collection('project').valueChanges({ idField: 'key' });
  }

  getProject(projectKey: string) {
    return this.fire.collection('project').doc(projectKey).valueChanges();
  }

  createProject(project: Project) {
    return this.fire.collection('project').add(project);
  }

  updateProject(project: Project) {
    // Untested
    this.fire.doc('project/' + project.key).update(project);
   }

  deletePolicy(projectKey: string) {
    // Archive here, not delete 
    // TODO 
  }
}
