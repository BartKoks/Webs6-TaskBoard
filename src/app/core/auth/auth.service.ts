import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../shared/model/user'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;
  userModelData: User = null;

  constructor(public afAuth: AngularFireAuth, private fire: AngularFirestore, private router: Router) { 
    this.afAuth.authState.subscribe((user =>{
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })),
    this.afAuth.authState.subscribe((userModel =>{
      if (userModel) {
        this.userModelData = Object.assign(userModel);
        localStorage.setItem('userModel', JSON.stringify(this.userModelData));
        JSON.parse(localStorage.getItem('userModel'));
      } else {
        localStorage.setItem('userModel', null);
        JSON.parse(localStorage.getItem('userModel'));
      }
    }))
  }

  // all firebase getdata functions
  get isUserAnonymousLoggedIn(): boolean {
    return (this.userData !== null) ? this.userData.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.userData !== null) ? this.userData.uid : ''
  }

  get currentUserName(): string {
    return this.userModelData.name;
  }

  get currentUser(): any {
    return (this.userData !== null) ? this.userData : null;
  }

  get currentUserModel(): User {
    return (this.userModelData !== null) ? this.userModelData : null;
  }

  get isUserEmailLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  async registerWithEmail(name: string, email: string, password: string) {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.userData = user;

      let newUser: User = {
        key: user.user.uid,
        name: name,
        email: email
      };
      this.fire.collection('user').add(newUser);
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string)
  {
    try {
      const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.userData = user;
      this.fire.collection<User>('user', ref => ref.where('key','==', user.user.uid)).valueChanges().subscribe(items => { 
        const userModel = items[0]; 
        this.userModelData = userModel;
      });
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  singout()
  {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userModel');
      this.router.navigate(['login']);
    })
  }


}