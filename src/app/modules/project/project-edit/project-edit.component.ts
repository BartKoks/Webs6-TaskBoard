import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/projects/project.service'

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    let project = this.projectService.getProject("cgh7l6kUH8NPyUuH15Mg")
  }

}
