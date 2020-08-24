import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';



@NgModule({
  declarations: [ProjectCreateComponent, ProjectEditComponent, ProjectListComponent],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [AngularFirestoreModule],
})
export class ProjectModule { }
