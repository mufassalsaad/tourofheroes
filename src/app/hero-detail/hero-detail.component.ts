import { Component, OnInit,Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  hero1:Hero;
  
  
  constructor(
    private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }
   getHero() {
    this.route.params.subscribe(params => {
      const id = params['id'];
    
    // const id = +this.route.snapshot.paramMap.get('_id');
    console.log(id);
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero1 = hero[0]
        console.log(this.hero1)
      } );
        

    })
  }
  goBack(): void {
    this.location.back();
  }
  save() {
    this.heroService.updateHero(this.hero1)
      .subscribe(() => this.goBack());
  }

}
