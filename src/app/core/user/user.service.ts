import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../shared/model/user'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fire: AngularFirestore) {
  }

  getUsers() {
    return this.fire.collection('user').valueChanges({ idField: 'key' });
  }

  getUser(userKey: string) {
    return this.fire.collection('user').doc(userKey).valueChanges();
  }

  updateUser(user: User) {
    // Untested
    this.fire.doc('user/' + user.key).update(user);
   }

  deletePolicy(userKey: string) {
    // Archive here, not delete 
    // TODO 
  }
}