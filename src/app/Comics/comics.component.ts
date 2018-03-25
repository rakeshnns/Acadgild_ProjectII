import { Component, OnInit } from '@angular/core';
import { MarvelComicService } from '../services/app.comic.services';
import { Comics, ComicsII, ComicsChar, ComicsCreator } from '../model/comic.model';
import { MarvelResponse } from '../model/marvel.model';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router'; /* to access the parameters*/
import { Location } from '@angular/common'; /* for location */
import 'rxjs/add/operator/switchMap';   /*for switchmap */

@Component({
  selector: 'app-comic',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
  providers: [
    MarvelComicService
  ]
})
export class ComicComponent implements OnInit {
  title = 'Marvel Comics';
  attribution: string;
  comics: Comics[] = [];
  shown = 10;
  total: number = null;
  filter = 'spider';
  constructor(private _marvelcomicService: MarvelComicService, private router: Router) { }

  async ngOnInit() {
    await this.refreshList();
  }
  async refreshList() {
    let response: MarvelResponse<Comics> = await this._marvelcomicService.getComics(this.shown, this.filter);
    this.comics = response.data.results;
    this.total = response.data.total;
    this.attribution = response.attributionHTML;
  }

  comicView(PassID) {
    console.log(PassID);
    this.router.navigate(['/comicview', PassID]);
  }

}



@Component({
  selector: 'app-comic-view',
  templateUrl: './comicview.component.html',
  styleUrls: ['./comicview.component.css'],
  providers: [
    MarvelComicService
  ]
})

export class ComicViewComponent implements OnInit {

  comicsii: ComicsII[] = [];
  comicschar: ComicsChar[] = [];
  attribution: string;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location,
    private _marvelcomicService: MarvelComicService) {}

  async ngOnInit() {
   /* await this.refreshList();*/
         /* Router Params to get the parameter value */

        this.route.params.subscribe(params => {
          this.id = params.PassID;
        });

        await this.refreshList();
  }

  async refreshList() {
    console.log('comicview1');
    let response: MarvelResponse<ComicsII> = await this._marvelcomicService.getComicbyId((this.id));
    let responsec: MarvelResponse<ComicsChar> = await this._marvelcomicService.getComicCharacterbyId((this.id));
    this.comicschar = responsec.data.results;
    this.comicsii = response.data.results;
    console.log(this.comicsii);
    this.attribution = response.attributionHTML;
  }

  comicCreatorView(PassID) {
    console.log(PassID);
    this.router.navigate(['/comiccreatorview', PassID]);
  }

}


@Component({
  selector: 'app-comic-creator-view',
  templateUrl: './comiccreatorview.component.html',
  styleUrls: ['./comiccreatorview.component.css'],
  providers: [
    MarvelComicService
  ]
})
export class ComicCreatorComponent implements OnInit {

  comicscreator: ComicsCreator[] = [];
  attribution: string;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location,
     private _marvelcomicService: MarvelComicService) {}

  async ngOnInit() {
   /* await this.refreshList();*/
         /* Router Params to get the parameter value */
        this.route.params.subscribe(params => {
          this.id = params.PassID;
        });

        await this.refreshList();
  }

  async refreshList() {
    console.log('Comiccreatorview1');
    let response: MarvelResponse<ComicsCreator> = await this._marvelcomicService.getComicCreator((this.id));
    this.comicscreator = response.data.results;
    console.log(this.comicscreator);
    this.attribution = response.attributionHTML;
  }

}

