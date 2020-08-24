import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Project } from '../../../shared/model/project';
import { ProjectService } from '../../../core/projects/project.service'

import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.sass']
})

export class ProjectCreateComponent implements OnInit {
  project: Project;
  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService) {
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
    console.log(this.project);

    this.projectService.createProject(this.project)
  }

}
