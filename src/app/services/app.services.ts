import 'rxjs/add/operator/toPromise';
import { Md5 } from 'ts-md5/dist/md5'; /*npm install ts-md5 --save* its used for Hashing the ts,public key, private key*/
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Character, CharacterII, CharacterCI } from '../model/character.model';
import { MarvelResponse } from '../model/marvel.model';

@Injectable()
export class MarvelService {
    private _marvelCharacterUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    private _publicKey = 'a1d7c7694bd65499af3e5089d7eb6b19';
    private _privateKey = 'd7ec3a5a502d085ab4485dbfb319a9fe9c9eb0fa';
    constructor(private _httpService: Http) {}
    private getHash(timeStamp: string): string {
        let hashGenerator: Md5 = new Md5();
        hashGenerator.appendStr(timeStamp);
        hashGenerator.appendStr(this._privateKey);
        hashGenerator.appendStr(this._publicKey);
        let hash: string = hashGenerator.end().toString();
        return hash;
    }
    private getTimeStamp(): string {
        return new Date().valueOf().toString();
    }
    public async getCharacters(limit: number = 10, prefix: string = null): Promise<MarvelResponse<Character>> {
        let timeStamp = this.getTimeStamp();
        let hash = this.getHash(timeStamp);
        let requestUrl = this._marvelCharacterUrl + '?limit=' + limit + '&ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;
        if (prefix) {
            requestUrl += '&nameStartsWith=' + prefix;
        }
        let response = await this._httpService.get(requestUrl).toPromise();
        console.log(response.json());
        return response.json();
    }


    public async getCharacterbyId(ID: number = 10): Promise<MarvelResponse<CharacterII>> {
        let timeStamp = this.getTimeStamp();
        let hash = this.getHash(timeStamp);
        let requestUrl = this._marvelCharacterUrl + '/' + ID + '?ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;

        let response = await this._httpService.get(requestUrl).toPromise();
        console.log(response.json());
        return response.json();
    }

    public async getCharacterComicbyId(ID: number = 10): Promise<MarvelResponse<CharacterCI>> {
        let timeStamp = this.getTimeStamp();
        let hash = this.getHash(timeStamp);
        let requestUrl = this._marvelCharacterUrl + '/' + ID + '/comics?ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;

        let response = await this._httpService.get(requestUrl).toPromise();
        console.log(response.json());
        return response.json();
    }
}
