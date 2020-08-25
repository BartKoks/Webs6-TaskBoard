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
      name: [null, Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      archived: ['', Validators.required],
      owner: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['key'];
      this.project = this.projectService.getProject(this.id)
    });
    this.project.subscribe(project => { 
      this.projectForm.setValue(project);
    });
  }

  ngOnSubmit(): void {
    if (this.projectForm.valid) {
      this.project = Object.assign(this.projectForm.value);    
      this.projectService.updateProject(this.id, this.project);
    }
    else {
      this.errorMessage = "Formulier is niet geldig"
    }
  }
}
