import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from '../../../core/sprints/sprint.service'
import { Sprint } from 'src/app/shared/model/sprint';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.sass']
})
export class SprintListComponent implements OnInit {

  projectId: string;
  sprints: any;

  constructor(private sprintService: SprintService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.projectId = id;
    });

    this.sprints =this.sprintService.getSprints(this.projectId);
  }

}
