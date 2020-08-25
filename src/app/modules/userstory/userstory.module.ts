import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserstoryRoutingModule } from './userstory-routing.module';

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UserstoryCreateComponent } from './userstory-create/userstory-create.component';
import { UserstoryListComponent } from './userstory-list/userstory-list.component';



@NgModule({
  declarations: [UserstoryCreateComponent, UserstoryListComponent],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    UserstoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [UserstoryListComponent],
  providers: [AngularFirestoreModule],
})

export class UserstoryModule { }
