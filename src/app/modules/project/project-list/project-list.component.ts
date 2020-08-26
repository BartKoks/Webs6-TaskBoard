import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/projects/project.service'
import { Project } from 'src/app/shared/model/project';
import { AuthService } from '../../../core/auth/auth.service';
import { ProjectUser } from 'src/app/shared/model/project-user';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.sass']
})
export class ProjectListComponent implements OnInit {

  isCollapsed = false;
  projects: any;
  archivedProjects: any;
  projectUsers: string[] = [];

  constructor(private projectService: ProjectService, private authservice: AuthService) {
  }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
    this.archivedProjects = this.projectService.getArchivedProjects();
    this.projectService.getMemberedProjects(this.authservice.userData.uid).subscribe(items => {
      items.forEach(item => {
        const project: ProjectUser = Object.assign(item);
        var projectKey = project.projectKey;
        this.projectUsers.push(projectKey);
      });
    });
  }

  ngArchive(project: Project, key: string): void {
    project.archived = project.archived ? false : true;
    console.log(project);
    this.projectService.archive(key, project);
  }

}
