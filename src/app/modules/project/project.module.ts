import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { SprintModule } from '../sprint/sprint.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';



@NgModule({
  declarations: [ProjectCreateComponent, ProjectEditComponent, ProjectListComponent, ProjectViewComponent],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SprintModule
  ],
  providers: [AngularFirestoreModule],
})
export class ProjectModule { }
