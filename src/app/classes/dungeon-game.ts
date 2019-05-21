
import { Engine, DisplayMode, Input, Loader, Texture, Debug } from 'excalibur';
import { MainMenu } from './mainmenu';
import { LocalStorageService } from 'angular-2-local-storage';
import { DungeonService } from '../services/dungeon-service.service';
import { GameScreen } from './game-screen';
import { Resources } from './resources';

export class DungeonGame extends Engine {
  dungeonService: DungeonService;
  resources: Resources;

  constructor(dungeonService: DungeonService) {
    super({
      canvasElementId: 'game',
      displayMode: DisplayMode.Container,
      pointerScope: Input.PointerScope.Canvas
    });
    this.isDebug = true;
    this.dungeonService = dungeonService;
  }

  public initialize() {
    this.add('mainmenu', new MainMenu(this));
    this.add('gamescreen', new GameScreen(this));
  }

  public start() {
    console.log('starting game');
    const loader = this.getLoader();
    return super.start(loader).then((data) => {
      console.log(data);
      this.goToScene('mainmenu');
    },
    error => {
      console.log(error);
    });
  }

  public getLoader() {
    const loader = new Loader();
    this.resources = new Resources();

    for (const [key, loadable] of Object.entries(this.resources)) {
      loader.addResource(loadable);
    }

    return loader;
  }

}
