import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../../shared/model/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private firestore: AngularFirestore) { }

  getProjects() {
    return this.firestore.collection('project').snapshotChanges();
  }
  getProject(projecKey: string) {
    return this.firestore.collection('project/').doc(projecKey).valueChanges()
  }

  createProject(project: Project) {
    project.key = this.firestore.createId();
    
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("project")
          .add(project as Project)
          .then(res => {}, err => reject(err));
  });
  }

  updateProject(project: Project) {
    this.firestore.doc('project/' + project.key).update(project);
  }

  deletePolicy(projectKey: string) {
    this.firestore.doc('project/' + projectKey).delete();
  }
}
