import 'rxjs/add/operator/toPromise';
import { Md5 } from 'ts-md5/dist/md5'; /*npm install ts-md5 --save* its used for Hashing the ts,public key, private key*/
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Comics, ComicsII, ComicsChar, ComicsCreator } from '../model/comic.model';
import { MarvelResponse } from '../model/marvel.model';

@Injectable()
export class MarvelComicService {
    private _marvelComicUrl = 'https://gateway.marvel.com:443/v1/public/comics';
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
    public async getComics(limit: number = 10, prefix: string = null): Promise<MarvelResponse<Comics>> {
        let timeStamp = this.getTimeStamp();
        let hash = this.getHash(timeStamp);
        let requestUrl = this._marvelComicUrl + '?limit=' + limit + '&ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;
        if (prefix) {
            requestUrl += '&titleStartsWith=' + prefix;
        }
        let response = await this._httpService.get(requestUrl).toPromise();
        console.log(response.json());
        return response.json();
    }


    public async getComicbyId(ID: number = 10): Promise<MarvelResponse<ComicsII>> {
        let timeStamp = this.getTimeStamp();
        let hash = this.getHash(timeStamp);
        let requestUrl = this._marvelComicUrl + '/' + ID + '?ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;

        let response = await this._httpService.get(requestUrl).toPromise();
        console.log(response.json());
        return response.json();
    }

    public async getComicCharacterbyId(ID: number = 10): Promise<MarvelResponse<ComicsChar>> {
        let timeStamp = this.getTimeStamp();
        let hash = this.getHash(timeStamp);
        let requestUrl = this._marvelComicUrl + '/' + ID + '/characters?ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;

        let response = await this._httpService.get(requestUrl).toPromise();
        console.log(response.json());
        return response.json();
    }

    public async getComicCreator(ID: number = 10): Promise<MarvelResponse<ComicsCreator>> {
        let timeStamp = this.getTimeStamp();
        let hash = this.getHash(timeStamp);
        let requestUrl = this._marvelComicUrl + '/' + ID + '/creators?ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;

        let response = await this._httpService.get(requestUrl).toPromise();
        console.log(response.json());
        return response.json();
    }
}
