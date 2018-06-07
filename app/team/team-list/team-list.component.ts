import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Team } from '~/team/models/team.model';

@Component({
  moduleId: module.id,
  selector: 'sn-team-list',
  templateUrl: './team-list.component.html',
})
export class TeamListComponent implements OnInit, OnDestroy {
  items: Team;
  ngUnsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe$))
      .forEach((data: {team: Team}) => this.items = data.team);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
