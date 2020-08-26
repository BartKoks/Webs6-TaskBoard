import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Userstory } from '../../../shared/model/userstory';
import { ProjectUser } from '../../../shared/model/project-user';
import { User } from '../../../shared/model/user';
import { UserstoryService } from '../../../core/userstory/userstory.service'
import { UserService } from '../../../core/user/user.service'
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-userstory-create',
  templateUrl: './userstory-create.component.html',
  styleUrls: ['./userstory-create.component.sass']
})
export class UserstoryCreateComponent implements OnInit {

  projectId: string;
  projectMembers: any;
  userstory: Userstory
  userstoryForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private userstoryService: UserstoryService, private userService: UserService, private authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.userstory = new Userstory();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.projectId = id;
    });

    this.userService.getUsersFromProject(this.projectId).subscribe(items => {
      this.projectMembers = items;
    });

    this.userstoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      storyPoints: ['', Validators.required],
      owner: ['', Validators.required]
    });
  }

  ngOnSubmit(): void {
    this.userstory = Object.assign(this.userstoryForm.value);
    this.userstory.projectKey = this.projectId;
    this.userstory.archived = false;
    this.userstory.status = "Nieuw";
    this.userstoryService.createUserstory(this.userstory)
    this.router.navigate(['/project/' + this.projectId])
  }

}
