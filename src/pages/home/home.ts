import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { NativeActionsProvider } from './../../providers/native-actions/native-actions.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isMute: boolean = false;
  language: string = 'en-US';
  translateTexts: Array<{title: string, text: string}>;

  constructor(
    private nativeStorage: NativeStorage,
    private translateService: TranslateService,
    private nativeActionsProvider: NativeActionsProvider,
    public navCtrl: NavController
  ) {

  }

  async ionViewCanEnter(): Promise<any> {
    this.nativeStorage.getItem('isMute').then(data => this.isMute = data);
    this.nativeStorage.getItem('language').then(data => this.language = data);

    const delay = time => new Promise(res => setTimeout(() => res(), time));
    await delay(1000);


    this.translateTexts = [
      { title: 'TOUCH_SCREEN_TAKE_PICTURE', text: '' }
    ];

    this.translateTexts.forEach(el => {
      this.translateService.get(el.title.toUpperCase()).subscribe((res: string) => {
        el.text = res;
      });
    });
  }

  ionViewDidLoad() {
    if (!this.isMute) {
      this.nativeActionsProvider.playAudio(this.translateTexts[0].text, this.language);
    }
  }

  takePicture() {
    this.navCtrl.setRoot('ImageDetailPage');
  }

}
