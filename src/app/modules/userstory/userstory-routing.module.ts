import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserstoryCreateComponent } from './userstory-create/userstory-create.component';
import { UserstoryListComponent } from './userstory-list/userstory-list.component';
import { UserstoryEditComponent } from './userstory-edit/userstory-edit.component';

const routes: Routes = [
  {
    path: 'create',
    component: UserstoryCreateComponent,
  },
  {
    path: ':projectKey/edit/:userstoryKey',
    component: UserstoryEditComponent
  },
  {
    path: '',
    component: UserstoryListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserstoryRoutingModule { }
