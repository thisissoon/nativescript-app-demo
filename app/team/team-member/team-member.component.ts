import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TeamMember } from '~/team/models/team.model';

@Component({
  moduleId: module.id,
  selector: 'sn-team-member',
  templateUrl: './team-member.component.html',
})
export class TeamMemberComponent implements OnInit, OnDestroy {
  item: TeamMember;
  ngUnsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe$))
      .forEach((data: {member: TeamMember}) => this.item = data.member);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
