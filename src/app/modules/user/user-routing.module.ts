import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddMemberComponent } from './user-add-member/user-add-member.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: UserAddMemberComponent,
  },
  {
    path: '',
    component: UserListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
