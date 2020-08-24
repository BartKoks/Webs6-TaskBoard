import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateComponent } from './project-create/project-create.component';

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectCreateComponent],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [AngularFirestoreModule],
})
export class ProjectModule { }
