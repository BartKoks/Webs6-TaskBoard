import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SprintModule } from '../sprint/sprint.module';
import { UserstoryModule } from '../userstory/userstory.module';
import { UserRoutingModule } from './user-routing.module';

import { UserAddMemberComponent } from './user-add-member/user-add-member.component';
import { UserListComponent } from './user-list/user-list.component';



@NgModule({
  declarations: [UserAddMemberComponent, UserListComponent],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SprintModule,
    UserstoryModule
  ],
  exports: [UserListComponent],
  providers: [AngularFirestoreModule],
})
export class UserModule { }
