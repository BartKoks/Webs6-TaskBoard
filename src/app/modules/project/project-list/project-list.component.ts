import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/projects/project.service'
import { Project } from 'src/app/shared/model/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent implements OnInit {

  projects: any;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }

}
