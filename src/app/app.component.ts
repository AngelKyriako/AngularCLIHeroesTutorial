import { Component, OnInit } from '@angular/core';

import { RouterModule }   from '@angular/router';

import { HeroesComponent } from './heroes.component';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title: string = 'Tour of Heroes';
  
  ngOnInit(): void {
    
  }
}
