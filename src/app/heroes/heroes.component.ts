import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  heroes1: Hero[];
  ishero = false;

  constructor(
    private heroService: HeroService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.getHeroes();
    this.getHeroes1();
    
  }
  getHeroes1(){
    this.heroService
    .getHeroes1()
    .subscribe((data: Hero[]) => {
      this.heroes1 = data;
      console.log(data);
      this.ishero = true;
      if ( this.heroes1.length == 0) {this.ishero = false}
  },
  err => {
    console.log(err);
  });
  }
  
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }
  add(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes = hero;
        this.getHeroes1();

      });
    // this.getHeroes1();

  }
  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero1(hero)
    .subscribe(heroes => {
      this.heroes = heroes;
      this.getHeroes1();
    });
  }

}
