import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const API : string ="https://orangevalleycaa.org/api/music";
@Injectable()
export class MusicProvider {

  public favoriteSongs=[]

  constructor(public http: Http) {
    console.log('Hello MusicProvider Provider');
  }

  getMusic()
  {
    //first method 
    //return this.http.get('http://orangevalleycaa.org/api/music')
    //.map((response)=>response.json());

    //second method

    return this.http.get(API)
    .map(response=>response.json());
  }

  getOneSong()
  {
    let oneSongUrl = API +"/qty/1";

    return this.http.get(oneSongUrl)
    .map(response=>response.json());
  }

  getFavorites(){
    return this.favoriteSongs;
  }

  addToFavorites(song){
    let isSongAdded = this.favoriteSongs.findIndex((favoriteSong)=> {
      return song.id === favoriteSong.id
    });

    if (isSongAdded === -1){
      this.favoriteSongs.push(song);
    }
  }

}
