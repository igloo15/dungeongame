import { Component, OnInit } from '@angular/core';
import {environment } from '../environments/environment.prod';
import * as ex from 'excalibur';
import { DungeonService } from './services/dungeon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dungeon-game';
  Version = environment.VERSION;
  service: DungeonService;

  constructor(service: DungeonService) {
    this.service = service;
  }

  ngOnInit() {

  }

  clickSave() {
    this.service.saveGame();
  }

}
