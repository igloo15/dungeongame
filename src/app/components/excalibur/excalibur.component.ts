import { Component, OnInit } from '@angular/core';
import { DungeonGame } from '../../classes/dungeon-game';
import { LocalStorageService } from 'angular-2-local-storage';
import { DungeonService } from 'src/app/services/dungeon-service.service';

@Component({
  selector: 'app-excalibur',
  templateUrl: './excalibur.component.html',
  styleUrls: ['./excalibur.component.scss']
})
export class ExcaliburComponent implements OnInit {

  currentGame: DungeonGame;

  constructor(private dungeonService: DungeonService) { }

  ngOnInit() {
    this.currentGame = new DungeonGame(this.dungeonService);
    this.currentGame.initialize();
    this.currentGame.start();
  }

}
