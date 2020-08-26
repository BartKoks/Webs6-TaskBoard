import { Component, OnInit } from '@angular/core';
import { UserstoryService } from '../../../core/userstory/userstory.service'
import { Userstory } from 'src/app/shared/model/userstory';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sprint-view',
  templateUrl: './sprint-view.component.html',
  styleUrls: ['./sprint-view.component.sass']
})
export class SprintViewComponent implements OnInit {
  sprintId: string;
  projectId: string;
  userstories: any;
  newUserstories: any;
  doingUserstories: any;
  doneUserstories: any;

  constructor(private userstoryService: UserstoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const sprintId = params['sprintKey'];
      const projectId = params['projectKey'];
      this.sprintId = sprintId;
      this.projectId = projectId;
    });

    this.userstoryService.getSprintUserstories(this.projectId, this.sprintId).subscribe(items => {
      this.userstories = items;

      this.newUserstories = this.userstories.filter(t => t.status == "Nieuw");
      this.doingUserstories = this.userstories.filter(t => t.status == "Bezig");
      this.doneUserstories = this.userstories.filter(t => t.status == "Klaar");
    });;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    var usKey = JSON.parse(JSON.stringify(event.container.data[event.previousIndex]["key"]));
    var us: Userstory = Object.assign(JSON.parse(JSON.stringify(event.container.data[event.previousIndex])));

    switch (event.container.id) {
      case "cdk-drop-list-0":
        us.status = "Nieuw";
        break;
      case "cdk-drop-list-1":
        us.status = "Bezig";
        break;
      case "cdk-drop-list-2":
        us.status = "Klaar";
        break;
    }
    this.userstoryService.updateUserstory(usKey, us);
  }
}
