import { Component, OnInit } from '@angular/core';
import {environment } from '../environments/environment.prod';
import * as ex from 'excalibur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dungeon-game';
  Version = environment.VERSION;
  ngOnInit() {
    const engine = new ex.Engine({
        canvasElementId: 'game',
        displayMode: ex.DisplayMode.Container
    });
    engine.start();
  }

}
