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
    return this.fire.collection('userstory', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('projectKey', '==', projectKey);
      query = query.where('archived', '==', false);
      return query;
    }).valueChanges( {idField: 'key'} ); //.where('sprintKey','==', null)
  }

  getSprintUserstories(projectKey: string, sprintKey: string) {
    return this.fire.collection('userstory', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('projectKey', '==', projectKey);
      query = query.where('sprintKey', '==', sprintKey);
      query = query.where('archived', '==', false);
      return query;
    }).valueChanges( {idField: 'key'} ); //.where('sprintKey','==', null)
  }

  getArchivedUserstories(projectKey: string) {
    return this.fire.collection('userstory', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('projectKey', '==', projectKey);
      query = query.where('archived', '==', true);
      return query;
    }).valueChanges( {idField: 'key'} ); //.where('sprintKey','==', null)
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

  archive(userstory: Userstory, key: string) {
    this.fire.doc('userstory/' + key).update(userstory);
  }
}
