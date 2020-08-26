import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../shared/model/user';
import { UserService } from '../../../core/user/user.service'
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { ProjectUser } from 'src/app/shared/model/project-user';

@Component({
  selector: 'app-user-add-member',
  templateUrl: './user-add-member.component.html',
  styleUrls: ['./user-add-member.component.sass']
})
export class UserAddMemberComponent implements OnInit {
  projectId: string;
  users: any;
  userForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.projectId = id;
    });

    this.userService.getUsers().subscribe(items => {
      this.users = items;
    });

    this.userForm = this.formBuilder.group({
      user: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnSubmit(): void {
    try {
      var user: User = this.userForm.controls['user'].value;
      var user: User = this.userForm.controls['user'].value;
      var projectUser: ProjectUser = {
        role: this.userForm.controls['role'].value,
        userKey: user.key,
        name: user.displayName,
        projectKey: this.projectId
      };


      this.userService.addUserToProject(projectUser)
      this.router.navigate(['/project/' + this.projectId])
    } catch (error) {
      this.errorMessage = "kies een lid.";
    }
  }
}