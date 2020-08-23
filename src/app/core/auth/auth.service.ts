import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afu: AngularFireAuth, private router: Router) { 
    this.afu.authState.subscribe((auth =>{
      this.authState = auth;
    }))
  }

  // all firebase getdata functions
  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  async registerWithEmail(email: string, password: string) {
    try {
      const user = await this.afu.createUserWithEmailAndPassword(email, password);
      this.authState = user;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string)
  {
    try {
      const user = await this.afu.signInWithEmailAndPassword(email, password);
      this.authState = user;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  singout(): void
  {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }


}
