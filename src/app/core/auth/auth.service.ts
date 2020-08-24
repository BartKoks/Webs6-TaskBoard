import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) { 
    this.afAuth.authState.subscribe((user =>{
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
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
    return this.userData['email']
  }

  get currentUser(): any {
    return (this.userData !== null) ? this.userData : null;
  }

  get isUserEmailLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  async registerWithEmail(email: string, password: string) {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.userData = user;
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
      this.router.navigate(['login']);
    })
  }


}