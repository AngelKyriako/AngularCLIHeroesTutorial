import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Injectable()
export class DashboardHeroService extends HeroService {

  constructor(http: Http) {
    super(http);
  }

  public get(): Promise<Hero[]> {
    return new  Promise<Hero[]>((resolve, reject) => {
      super.get()
      .then((response) => {
        resolve(response.slice(0,4));
      })
      .catch(reject);
    });
  }

}