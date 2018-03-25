import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../services/app.services';
import { Character, CharacterII, CharacterCI } from '../model/character.model';
import { MarvelResponse } from '../model/marvel.model';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router'; /* to access the parameters*/
import { Location } from '@angular/common'; /* for location */
import 'rxjs/add/operator/switchMap';   /*for switchmap */

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
  providers: [
    MarvelService
  ]
})
export class CharacterComponent implements OnInit {
  title = 'Marvel Characters';
  attribution: string;
  characters: Character[] = [];
  shown = 10;
  total: number = null;
  filter = 'spider';
  constructor(private _marvelService: MarvelService, private router: Router) { }

  async ngOnInit() {
    await this.refreshList();
  }
  async refreshList() {
    let response: MarvelResponse<Character> = await this._marvelService.getCharacters(this.shown, this.filter);
    this.characters = response.data.results;
    this.total = response.data.total;
    this.attribution = response.attributionHTML;
  }

  characterView(PassID) {
    console.log(PassID);
    this.router.navigate(['/Characterview', PassID]);
  }

}



@Component({
  selector: 'app-character-view',
  templateUrl: './characterview.component.html',
  styleUrls: ['./characterview.component.css'],
  providers: [
    MarvelService
  ]
})

export class CharacterViewComponent implements OnInit {

  charactersii: CharacterII[] = [];
  attribution: string;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private _marvelService: MarvelService) {}

  async ngOnInit() {
   /* await this.refreshList();*/
         /* Router Params to get the parameter value */
        this.route.params.subscribe(params => {
          this.id = params.PassID;
        });

        await this.refreshList();
  }

  async refreshList() {
    console.log('characterview1');
    let response: MarvelResponse<CharacterII> = await this._marvelService.getCharacterbyId((this.id));
    this.charactersii = response.data.results;
    console.log(this.charactersii);
    this.attribution = response.attributionHTML;
  }

  characterComicView(PassID) {
    console.log(PassID);
    this.router.navigate(['/CharacterComicview', PassID]);
  }

}


@Component({
  selector: 'app-character-comic-view',
  templateUrl: './charactercomicview.component.html',
  styleUrls: ['./charactercomicview.component.css'],
  providers: [
    MarvelService
  ]
})
export class CharacterComicComponent implements OnInit {

  charactersci: CharacterCI[] = [];
  attribution: string;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private _marvelService: MarvelService) {}

  async ngOnInit() {
   /* await this.refreshList();*/
         /* Router Params to get the parameter value */
        this.route.params.subscribe(params => {
          this.id = params.PassID;
        });

        await this.refreshList();
  }

  async refreshList() {
    console.log('characterComicview1');
    let response: MarvelResponse<CharacterCI> = await this._marvelService.getCharacterComicbyId((this.id));
    this.charactersci = response.data.results;
    console.log(this.charactersci);
    this.attribution = response.attributionHTML;
  }

}

