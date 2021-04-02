import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private sounds: Sound[] = [];
  private audioPlayer: HTMLAudioElement = new Audio();
  private forceWebAudio = true;

  constructor(private platform: Platform, private nativeAudio: NativeAudio) {}

  preload(key: string, asset: string): void {
    if (this.platform.is('cordova') && !this.forceWebAudio) {
      this.nativeAudio.preloadSimple(key, asset);

      this.sounds.push({
        key,
        asset,
        isNative: true,
      });
    } else {
      const audio = new Audio();
      audio.src = asset;

      this.sounds.push({
        key,
        asset,
        isNative: false,
      });
    }
  }

  play(key: string): void {
    const soundToPlay = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if (soundToPlay.isNative) {
      this.nativeAudio.play(soundToPlay.asset).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play();
    }
  }
}

interface Sound {
  key: string;
  asset: string;
  isNative: boolean;
}
