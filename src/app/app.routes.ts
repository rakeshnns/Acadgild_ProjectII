import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharacterComponent, CharacterViewComponent, CharacterComicComponent} from './character/character.component';
import { ComicComponent, ComicViewComponent, ComicCreatorComponent } from './Comics/comics.component';
import { CallbackComponent } from './callback/callback.component';

export const ROUTES: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },    /*Default route*/
  { path: 'home', component: HomeComponent },
  { path: 'character', component: CharacterComponent },
  { path: 'Characterview/:PassID', component: CharacterViewComponent },
  { path: 'CharacterComicview/:PassID', component: CharacterComicComponent },
  { path: 'comic', component: ComicComponent },
  { path: 'comicview/:PassID', component: ComicViewComponent },
  { path: 'comiccreatorview/:PassID', component: ComicCreatorComponent },
  { path: 'callback', component: CallbackComponent },
 /* { path: '**', redirectTo: '' }*/
];
