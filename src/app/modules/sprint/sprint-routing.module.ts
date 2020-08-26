import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SprintCreateComponent } from './sprint-create/sprint-create.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintViewComponent } from './sprint-view/sprint-view.component';

const routes: Routes = [
  {
    path: 'create',
    component: SprintCreateComponent
  },
  {
    path: ':projectKey/:sprintKey',
    component: SprintViewComponent
  },
  {
    path: '',
    component: SprintListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintRoutingModule { }
