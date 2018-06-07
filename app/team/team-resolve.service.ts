import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Team, TeamMember } from '~/team/models/team.model';
import { teamMembers } from '~/team/data/team-data';

@Injectable()
export class TeamResolveService implements Resolve<Team> {
  resolve(): Observable<Team> {
    return of(teamMembers);
  }
}

@Injectable()
export class TeamMemberResolveService implements Resolve<TeamMember> {
  resolve(route: ActivatedRouteSnapshot): Observable<TeamMember> {
    const id = parseInt(route.paramMap.get('id'), 10);
    return of(teamMembers.find(member => member.id === id));
  }
}

export const teamResolvers = [
  TeamResolveService,
  TeamMemberResolveService
];
