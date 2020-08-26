import { Component, OnInit } from '@angular/core';
import { UserstoryService } from '../../../core/userstory/userstory.service'
import { Userstory } from 'src/app/shared/model/userstory';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userstory-list',
  templateUrl: './userstory-list.component.html',
  styleUrls: ['./userstory-list.component.sass']
})
export class UserstoryListComponent implements OnInit {

  projectId: string;
  isCollapsed = false;
  userstories: any;
  archivedUserstories: any;

  constructor(private userstoryService: UserstoryService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['key'];
      this.projectId = id;
    });

    this.userstories = this.userstoryService.getUserstories(this.projectId);
    this.archivedUserstories = this.userstoryService.getArchivedUserstories(this.projectId);
  }

  ngArchive(userstory: Userstory, key: string): void{
    userstory.archived = userstory.archived ? false : true;
    this.userstoryService.archive(userstory, key);
  }

}
