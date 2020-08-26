import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { UserstoryService } from '../../../core/userstory/userstory.service'
import { Userstory } from 'src/app/shared/model/userstory';
import { Sprint } from 'src/app/shared/model/sprint';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-sprint-view',
  templateUrl: './sprint-view.component.html',
  styleUrls: ['./sprint-view.component.sass']
})
export class SprintViewComponent implements OnInit {
  sprintId: string;
  projectId: string;
  userstories: any;
  newUserstories: Userstory[];
  doingUserstories: Userstory[];
  doneUserstories: Userstory[];
  startdate: Date;
  enddate: Date;

  //chartdata
  dates: Array<string> = [];
  points: Array<number> = [];
  idealpoints: Array<number> = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[];
  chartReady = false;


  constructor(private userstoryService: UserstoryService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const sprintId = params['sprintKey'];
      const projectId = params['projectKey'];
      const startdate = params['startDate'];
      const enddate = params['endDate'];
      this.sprintId = sprintId;
      this.projectId = projectId;
      this.startdate = startdate;
      this.enddate = enddate;
    });

    this.userstoryService.getSprintUserstories(this.projectId, this.sprintId).subscribe(items => {
      this.userstories = items;
      this.newUserstories = this.userstories.filter(t => t.status == "Nieuw");
      this.doingUserstories = this.userstories.filter(t => t.status == "Bezig");
      this.doneUserstories = this.userstories.filter(t => t.status == "Klaar");
      this.setChartData();
    });;


  }

  setChartData() {

    //calculate storypoints
    var totalStoryPoints = 0;
    var variableStoryPoints = 0;
    this.userstories.forEach(item => {
      totalStoryPoints += item.storyPoints;
      variableStoryPoints = totalStoryPoints;
    })

    //get linecharts
    this.lineChartData = [
      {
        data: this.idealpoints, label: 'De ideale lijn'
      },
      {
        data:
          this.points, label: 'burndown'
      },
    ];

    //calculate sprint duration
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate: any = this.startdate;
    const secondDate: any = this.enddate;

    let a = moment(this.startdate);
    let b = moment(this.enddate);
    let tempDate = a;
    let daysCount = b.diff(a, 'days');

    this.dates = [];
    this.points = [];
    this.dates.push(this.startdate.toString());
    this.points.push(totalStoryPoints);
    this.idealpoints.push(totalStoryPoints);

    for (let i = 1; i < daysCount; i++) {
      //push points for that date
      this.doneUserstories.forEach(item => {
        if (item.completeDate != null && tempDate.dayOfYear() == moment(item.completeDate).dayOfYear()) {
          variableStoryPoints -= item.storyPoints;
          this.points.push(variableStoryPoints);
        }
      });

      //push date
      tempDate = tempDate.add(1, 'day');
      this.dates.push(tempDate.toString());
      
      this.idealpoints.push(this.chartDataValues(totalStoryPoints, daysCount, i));
    }
    this.dates.push(this.enddate.toString());
    this.idealpoints.push(0);
    console.log(this.idealpoints);

    //set colors
    this.lineChartLabels = this.dates;
    this.lineChartColors = [
      {
        borderColor: 'red',
        backgroundColor: 'rgba(0,0,0,0.0)',
      },
      {
        borderColor: 'black',
        backgroundColor: 'rgba(22,150,122,0.28)',
      },
    ];

    this.chartReady = true;
  }

  chartDataValues(totalStoryPoints: number, daysCount: number, percentage: number): number {
    return totalStoryPoints / daysCount * percentage;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    var usKey = JSON.parse(JSON.stringify(event.container.data[event.previousIndex]["key"]));
    var us: Userstory = Object.assign(JSON.parse(JSON.stringify(event.container.data[event.previousIndex])));
    console.log(event.container.id);
    switch (event.container.id) {
      case "cdk-drop-list-0":
        us.status = "Nieuw";
        us.completeDate = null;
        this.userstoryService.updateUserstory(usKey, us);
        break;
      case "cdk-drop-list-1":
        us.status = "Bezig";
        us.completeDate = null;
        this.userstoryService.updateUserstory(usKey, us);
        break;
      case "cdk-drop-list-2":
        us.status = "Klaar";
        this.userstoryService.updateUserstory(usKey, us);
        us.completeDate = moment(new Date()).toString();
        break;
    }
    this.newUserstories = this.userstories.filter(t => t.status == "Nieuw");
    this.doingUserstories = this.userstories.filter(t => t.status == "Bezig");
    this.doneUserstories = this.userstories.filter(t => t.status == "Klaar");
  }
}
