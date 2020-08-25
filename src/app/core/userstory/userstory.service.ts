import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Userstory } from '../../shared/model/userstory'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {

  constructor(private fire: AngularFirestore) {
  }

  getUserstories(projectKey: string) {
    return this.fire.collection('userstory', ref => ref.where('projectKey','==', projectKey)).valueChanges({ idField: 'key' });
  }

  getUserstory(userstoryKey: string) {
    return this.fire.collection('userstory').doc(userstoryKey).valueChanges();
  }

  createUserstory(sprint: Userstory) {
    this.fire.collection('userstory').add(sprint);
  }

  updateUserstory(key: string, sprint: Userstory) {
    this.fire.doc('userstory/' + key).update(sprint);
   }

  deletePolicy(projectKey: string) {
    // Archive here, not delete 
    // TODO 
  }
}
