import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/projects/project.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/shared/model/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {
  project: any;
  id: string;
  projectForm: FormGroup;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.id = id;
      this.project = this.projectService.getProject(id)
    });
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.project.subscribe(items => { 
      this.project = items;
      this.projectForm.setValue({name: items.name, description: items.description, status: items.status});
    });
  }

  ngOnSubmit(): void {
    this.project.name = this.projectForm.controls['name'].value;
    this.project.description = this.projectForm.controls['description'].value;
    this.project.status = this.projectForm.controls['status'].value;

    if (this.validateForm(this.project)) {
      this.projectService.updateProject(this.id, this.project);
      this.router.navigate(['/project']);
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
