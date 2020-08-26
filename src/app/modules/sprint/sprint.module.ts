import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { SprintRoutingModule } from './sprint-routing.module';

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SprintCreateComponent } from './sprint-create/sprint-create.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintViewComponent } from './sprint-view/sprint-view.component';



@NgModule({
  declarations: [SprintCreateComponent, SprintListComponent, SprintViewComponent],
  imports: [
    AngularFirestoreModule,
    MatCardModule,
    DragDropModule,
    CommonModule,
    SprintRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SprintListComponent],
  providers: [AngularFirestoreModule],
})
export class SprintModule { }
