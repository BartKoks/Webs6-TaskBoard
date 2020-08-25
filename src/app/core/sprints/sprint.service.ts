import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Sprint } from '../../shared/model/sprint'

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private fire: AngularFirestore) {
  }

  getSprints(projectKey: string) {
    return this.fire.collection('sprint', ref => ref.where('projectKey','==', projectKey)).valueChanges({ idField: 'key' });
  }

  getSprint(sprintKey: string) {
    return this.fire.collection('sprint').doc(sprintKey).valueChanges();
  }

  createSprint(sprint: Sprint) {
    this.fire.collection('sprint').add(sprint);
  }

  updateProject(key: string, sprint: Sprint) {
    this.fire.doc('sprint/' + key).update(sprint);
   }

  deletePolicy(projectKey: string) {
    // Archive here, not delete 
    // TODO 
  }
}
