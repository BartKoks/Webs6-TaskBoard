import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {
    path: 'create',
    component: ProjectCreateComponent,
  },
  {
    path: 'edit/:key',
    component: ProjectEditComponent,
  },
  {
    path: ':key',
    component: ProjectViewComponent
  },
  {
    path: ':key/sprint',
    loadChildren: () => import('../sprint/sprint.module').then(m => m.SprintModule), 
  },
  {
    path: '',
    component: ProjectListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
