import { Component } from '@angular/core';
import { NavController, LoadingController,ActionSheetController} from 'ionic-angular';
import {MusicProvider} from '../../providers/music/music';
import {SocialSharing} from '@ionic-native/social-sharing';
import {MusicPage} from '../music/music'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic = [];
  //dans cette app on va travailler avec les données à partir du serveur 
  constructor(private socialSharing:SocialSharing,private actionSheetController:ActionSheetController,public navCtrl: NavController,private _service:MusicProvider,private loadCtrl:LoadingController) 
  {
      //test 
      /*this._service.getMusic().subscribe(data =>
        console.log(data)
      )*/
  }

  ionViewDidLoad()
  {
    let allMusicLoading = this.loadCtrl.create({
      content:"Getting Your Music From Server",
      
    });
    allMusicLoading.present();
    this._service.getMusic().subscribe((data) => {
      allMusicLoading.dismiss()
      this.allMusic = data;
    })
  }

  refresh(refresher)
  {
    this._service.getOneSong().subscribe((oneSong) => 
    {
      this.allMusic.unshift(oneSong[0]);
      refresher.complete();
      
    });
  }

  shareSong(music){
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share Song With Friends",
      buttons: [
        {
          text: "Share On Facebook",
          icon: "logo-facebook",
          handler: () =>
          {
              this.socialSharing.shareViaFacebook(music.name,music.image,music.music_url);
          }
        },
        {
          text: "Share On Twitter",
          icon: "logo-twitter",
          handler: () =>
          {
              this.socialSharing.shareViaTwitter(music.name,music.image,music.music_url);
          }
        },
        {
          text: "Share",
          icon: "share",
          handler: () =>
          {
              this.socialSharing.shareVia(music.name,"",music.image,music.music_url)
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });
    shareSongActionSheet.present();
  }

  listenMusic(music)
  {
    this.navCtrl.push(MusicPage,{music:music})
  }

  addFavorites(music)
  {
    this._service.addToFavorites(music);
  }
}
