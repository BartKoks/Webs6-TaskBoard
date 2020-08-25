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
    this.project = Object.assign(this.projectForm.value);
    this.project.status = "nieuw";
    this.project.owner = this.authservice.userData.displayName;
    this.project.archived = false;
    
    if (this.validateForm(this.project)) {
      this.projectService.createProject(this.project, this.authservice.userData.displayName)
      this.router.navigate(['/project'])
    }
  }

  validateForm(project)
  {
    if(project.name.lenght === 0)
    {
      this.errorMessage = "Geef een project naam op.";
      return false;
    }

    if (project.name.lenght < 6)
    {
      this.errorMessage = "Het wachtwoord moet minimaal 6 karakters lang zijn.";
      return false;
    }

    if (project.owner == undefined)
    {
      this.errorMessage = 'Er is iets fout gegaan';
      return false;
    }
    this.errorMessage = '';

    return true;
  }


}
