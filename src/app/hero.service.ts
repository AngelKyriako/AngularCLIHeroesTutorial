import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from "./hero";

@Injectable()
export class HeroService {

  private readonly headers = new Headers({'Content-Type': 'application/json'});
  private readonly serverUrl = 'api/heroes';

  protected serverHeroes: Hero[];
  protected heroes: Hero[];

  public constructor(protected http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public get(): Promise<Hero[]> {
    return this.http.get(this.serverUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  public getById(id: number): Promise<Hero> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.serverUrl, JSON.stringify({name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.serverUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // Before Http Implementation:
  //
  // public get(): Promise<Hero[]> {
  //   if (!this.heroes) {
  //     return new Promise<Hero[]>((resolve, reject) => {
  //       // simulate latency for first retrieve
  //       setTimeout(() => {
  //         this.heroes = this.serverHeroes;
  //         resolve(this.heroes);
  //       }, 1000);
  //     });
  //   } else {
  //     return Promise.resolve(this.heroes);
  //   }
  // }

  // public getById(id: number): Promise<Hero> {
  //   // return Promise.resolve(this.heroes.find((h: Hero) => {
  //   //   return h.id === id;
  //   // }))
  //   return new Promise<Hero>((resolve, reject) => {
  //     this.get().then((heroes: Hero[]) => {
  //       const hero: Hero = heroes.find((h: Hero) => {
  //         return h.id === id;
  //       });
  //       resolve(hero);
  //     });
  //   });
  // }

}
