import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { teamResolvers } from '~/team/team-resolve.service';
import { TeamRoutingModule, routedComponents } from '~/team/team-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, TeamRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [...teamResolvers],
  declarations: [...routedComponents],
})
export class TeamModule { }
