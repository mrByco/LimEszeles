import {Component, OnInit} from '@angular/core';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'game';

  sound = new Howl({
    src: ['assets/music.mp3']
  });

  constructor() {
  }

  ngOnInit() {
    this.startMusic()
  }

  async startMusic() {

    this.sound.play();
    Howler.volume(1);
  }


}
