import { Component, OnInit } from '@angular/core';
import * as ex from 'excalibur';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dungeon-game';

  ngOnInit() {
    const engine = new ex.Engine({
        canvasElementId: 'game',
        displayMode: ex.DisplayMode.Container
    });
    engine.start();
  }

}
