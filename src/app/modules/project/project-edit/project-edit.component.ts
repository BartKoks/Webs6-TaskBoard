import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/projects/project.service'
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/shared/model/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {
  project: Project;
  projectForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      console.log('Url Id: ', id);
    })
  }

  ngOnSubmit(): void {
    this.project = Object.assign(this.projectForm.value);

    this.projectService.updateProject(this.project)
  }
}
