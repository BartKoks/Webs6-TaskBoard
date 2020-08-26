import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Project } from '../../../shared/model/project';
import { ProjectService } from '../../../core/projects/project.service'
import { AuthService } from '../../../core/auth/auth.service';

import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.sass']
})

export class ProjectCreateComponent implements OnInit {
  project: Project;
  projectForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private authservice: AuthService, private router: Router) {
    this.project = new Project();
  }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnSubmit(): void {
    if (this.projectForm.valid) {
      this.project = Object.assign(this.projectForm.value);
      this.project.status = "nieuw";
      this.project.owner = this.authservice.userData.displayName;
      this.project.archived = false;
      this.projectService.createProject(this.project, this.authservice.userData.displayName)
      this.router.navigate(['/project'])
    }
    else {
      this.errorMessage = "Formulier is niet geldig"
    }
  }
}
