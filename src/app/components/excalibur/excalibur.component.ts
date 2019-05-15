import { Component, OnInit } from '@angular/core';
import { DungeonGame } from '../../classes/dungeon-game';

@Component({
  selector: 'app-excalibur',
  templateUrl: './excalibur.component.html',
  styleUrls: ['./excalibur.component.scss']
})
export class ExcaliburComponent implements OnInit {

  currentGame: DungeonGame;

  constructor() { }

  ngOnInit() {
    this.currentGame = new DungeonGame();
    this.currentGame.initialize();
    this.currentGame.start();
  }

}
