import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from "./hero";
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.styl']
})
export class HeroDetailComponent implements OnInit {
  protected hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    // The switchMap operator maps the id in the Observable route parameters to a new Observable,
    // the result of the HeroService.getHero() method.
    //
    // If a user re-navigates to this component while a getHero request is still processing,
    // switchMap cancels the old request and then calls HeroService.getHero() again.
    this.route.params
      .switchMap((params: Params) => this.heroService.getById(+params['id'])) // cast to number: + someStringThatIsNumber = Number.
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

}