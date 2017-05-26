import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from "./hero";
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',

  // HeroService defaults to HeroService from app.module.ts
  // providers: [ HeroService ],

  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.styl']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  selectedHero: Hero;

  constructor(
    private router: Router,
    private location: Location,
    private heroService: HeroService
  ) { }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit(): void {
    this.heroService.get()
    .then((heroesFetched: Hero[]) => {
      this.heroes = heroesFetched;
    })
    .catch(() => {
      this.location.back();
    });
  }

  gotoDetail(): void {
    this.router.navigate(['/heroes', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name || name.length === 0) { return; }
    this.heroService.create(name)
      .then((hero: Hero) => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }
}
