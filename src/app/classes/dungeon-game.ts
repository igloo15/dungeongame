
import { Engine, DisplayMode, Input } from 'excalibur';
import { MainMenu } from './mainmenu';
import { LocalStorageService } from 'angular-2-local-storage';
import { DungeonService } from '../services/dungeon-service.service';
import { GameScreen } from './game-screen';


export class DungeonGame extends Engine {
  dungeonService: DungeonService;
  constructor(dungeonService: DungeonService) {
    super({
      canvasElementId: 'game',
      displayMode: DisplayMode.Container,
      pointerScope: Input.PointerScope.Canvas
    });
    this.dungeonService = dungeonService;
  }

  public initialize() {
    this.add('mainmenu', new MainMenu(this));
    this.add('gamescreen', new GameScreen(this));
  }

  public start() {
    console.log('starting game');

    return super.start().then(() => {
      this.goToScene('mainmenu');
    });
  }

}
