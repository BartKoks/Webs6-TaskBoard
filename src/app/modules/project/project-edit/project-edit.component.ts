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
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.id = id;
      this.project = this.projectService.getProject(id)
    });
    this.project.subscribe(items => {
      this.project = items;
      this.projectForm.setValue({ name: items.name, description: items.description, status: items.status });
    });
  }

  ngOnSubmit(): void {
    if (this.projectForm.valid) {
      this.project.name = this.projectForm.controls['name'].value;
      this.project.description = this.projectForm.controls['description'].value;
      this.project.status = this.projectForm.controls['status'].value;
      this.projectService.updateProject(this.id, this.project);
      this.router.navigate(['/project']);
    }
    else {
      this.errorMessage = "Formulier is niet geldig"
    }
  }

}
