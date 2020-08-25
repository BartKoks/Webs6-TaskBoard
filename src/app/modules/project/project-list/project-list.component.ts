import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/projects/project.service'
import { Project } from 'src/app/shared/model/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent implements OnInit {

  isCollapsed = false;
  projects: any;
  archivedProjects: any;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.archivedProjects = this.projectService.getArchivedProjects();
  }

  ngArchive(project: Project): void{
    project.archived = project.archived ? false : true;
    console.log(project);
    this.projectService.archive(project);
  }

}
