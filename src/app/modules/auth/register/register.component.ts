import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/auth/auth.service';
import {UserService} from '../../../core/user/user.service';
import { User } from '../../../shared/model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  name="";
  email="";
  password="";
  message = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' }; // for firbase error handle

  constructor(private authservice: AuthService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  register()
  {
    this.clearErrorMessage();
    if (this.validateForm(this.name, this.email, this.password)) {
      this.authservice.SignUp(this.name, this.email, this.password)
        .then(() => {
          this.router.navigate(['/login'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/register'])
        })
    }
  }

  validateForm(name, email, password)
  {
    if(name.lenght === 0)
    {
      this.errorMessage = "Geef een naam op.";
      return false;
    }

    if(email.lenght === 0)
    {
      this.errorMessage = "Geef een emailadres op.";
      return false;
    }

    if (password.lenght === 0) {
      this.errorMessage = "Geef een wachtwoord op.";
      return false;
    }

    if (password.lenght < 6)
    {
      this.errorMessage = "Het wachtwoord moet minimaal 6 karakters lang zijn.";
      return false;
    }

    this.errorMessage = '';
    return true;
  }
}