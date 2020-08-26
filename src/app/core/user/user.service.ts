import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../shared/model/user'
import { ProjectUser } from '../../shared/model/project-user'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fire: AngularFirestore) {
  }

  addUserToProject(projectUser: ProjectUser) {
    this.fire.collection('project-user').add(projectUser);
  }

  getUsers() {
    return this.fire.collection('user').valueChanges({ idField: 'key' });
  }

  getUsersFromProject(projectKey: string) {
    return this.fire.collection('project-user', ref => ref.where('projectKey', '==', projectKey)).valueChanges({ idField: 'key' })
  }

  getUser(userKey: string) {
    return this.fire.collection('user').doc(userKey).valueChanges();
  }

  updateUser(user: User) {
    // Untested
    this.fire.doc('user/' + user.key).update(user);
  }

  deleteMemberFromProject(key: string) {
    this.fire.doc('project-user/' + key).delete();
  }
}