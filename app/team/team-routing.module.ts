import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { TeamListComponent } from '~/team/team-list/team-list.component';
import { TeamMemberComponent } from '~/team/team-member/team-member.component';
import { TeamMemberResolveService, TeamResolveService } from '~/team/team-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: TeamListComponent,
    resolve: { team: TeamResolveService }
  },
  {
    path: ':id',
    component: TeamMemberComponent,
    resolve: { member: TeamMemberResolveService }
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class TeamRoutingModule { }

export const routedComponents = [
  TeamListComponent,
  TeamMemberComponent
];
