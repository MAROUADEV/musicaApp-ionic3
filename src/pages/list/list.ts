import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public favoriteSongs=[]
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private _service:MusicProvider) {


    
  }

  ionViewDidLoad()
  {
    this.favoriteSongs = this._service.getFavorites();
  }

  
  
}
