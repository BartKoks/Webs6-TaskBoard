import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Project } from '../../shared/model/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private firebase: AngularFireDatabase) { }

  getProjects() {
    // return this.firestore.collection('project').snapshotChanges();
  }
  getProject(projecKey: string) {
    let ref = this.firebase.list('sprint', ref => ref.orderByChild('project').equalTo("MFVhWsqQVPICw8dkC_T")).valueChanges().subscribe(res=> console.log(res))
  }

  createProject(project: Project) {
    const projectsRef = this.firebase.list('project');
    projectsRef.push(project);
  }


  updateProject(projectKey: string, project: Project) {
    const itemsRef = this.firebase.list('project');
    itemsRef.update(projectKey, project);
  }

  deletePolicy(projectKey: string) {
    // this.firestore.doc('project/' + projectKey).delete();
  }
}
