import { Component, OnInit } from '@angular/core';
import { Location }                 from '@angular/common';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { DashboardHeroService } from './dashboard.hero.service';
@Component({
  selector: 'my-dashboard',

  providers: [
    // override HeroService provider from app.module.ts
    {provide: HeroService, useExisting: DashboardHeroService}
  ],

  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.styl' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private location: Location,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.heroService.get()
    .then((heroes: Hero[]) => {
      this.heroes = heroes;
    }).catch(() => {
      this.location.back();
    });
  }
}