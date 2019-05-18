import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { DungeonGameData } from '../classes/dungeon-game-data';

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  public gameData: DungeonGameData;
  private gameDataKey = 'game-data';

  constructor(private localStorageService: LocalStorageService) { }

  newGame() {
    this.gameData = new DungeonGameData('test-game');
    this.localStorageService.set(this.gameDataKey, this.gameData);
  }

  loadGame() {
    this.gameData = this.localStorageService.get<DungeonGameData>(this.gameDataKey);
  }
}
