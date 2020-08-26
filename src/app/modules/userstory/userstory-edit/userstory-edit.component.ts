import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Userstory } from '../../../shared/model/userstory';
import { ProjectUser } from '../../../shared/model/project-user';
import { User } from '../../../shared/model/user';
import { UserstoryService } from '../../../core/userstory/userstory.service'
import { UserService } from '../../../core/user/user.service'
import { SprintService } from '../../../core/sprints/sprint.service'
import { AuthService } from '../../../core/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-userstory-edit',
  templateUrl: './userstory-edit.component.html',
  styleUrls: ['./userstory-edit.component.sass']
})
export class UserstoryEditComponent implements OnInit {

  userstoryForm: FormGroup;
  userstoryId: string;
  projectId: string;
  userstory: any
  projectMembers: any;
  projectSprints: any;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private userstoryService: UserstoryService, private sprintService: SprintService, private userService: UserService, private authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const userstoryId = params['userstoryKey'];
      const projectId = params['projectKey'];
      this.userstoryId = userstoryId;
      this.projectId = projectId;
      this.userstory = this.userstoryService.getUserstory(userstoryId);
    });

    this.userService.getUsersFromProject(this.projectId).subscribe(items => {
      this.projectMembers = items;
    });

    this.sprintService.getSprints(this.projectId).subscribe(items => {
      this.projectSprints = items;
    });

    this.userstoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      storyPoints: ['', Validators.required],
      owner: ['', Validators.required],
      sprintKey: ['', Validators.required]
    });

    this.userstory.subscribe(items => { 
      this.userstory = items;
      this.userstoryForm.setValue({name: items.name, description: items.description, storyPoints: items.storyPoints, owner: items.owner, sprintKey: items.sprintKey == null ? '' : items.sprintKey});
    });
  }

  ngOnSubmit(): void {
    this.userstory.name = this.userstoryForm.controls['name'].value;
    this.userstory.description = this.userstoryForm.controls['description'].value;
    this.userstory.storyPoints = this.userstoryForm.controls['storyPoints'].value;
    this.userstory.owner = this.userstoryForm.controls['owner'].value;
    this.userstory.sprintKey = this.userstoryForm.controls['sprintKey'].value;

    //if (this.validateForm(this.project)) {
      this.userstoryService.updateUserstory(this.userstoryId, this.userstory);
      this.router.navigate(['/project/' + this.projectId]);
    //}
  }

}
