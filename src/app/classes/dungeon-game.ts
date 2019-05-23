
import { Engine, DisplayMode, Input, Loader, Texture, Debug } from 'excalibur';
import { MainMenu } from './mainmenu';
import { DungeonService } from '../services/dungeon-service.service';
import { GameScreen } from './game-screen';
import { Resources } from './resources';

export class DungeonGame {
  dungeonService: DungeonService;
  engine: Engine;

  constructor(dungeonService: DungeonService) {
    this.engine = new Engine({
      canvasElementId: 'game',
      displayMode: DisplayMode.Container,
      pointerScope: Input.PointerScope.Canvas,
      suppressPlayButton: true
    });
    this.dungeonService = dungeonService;
  }

  public initialize() {
    this.engine.add('mainmenu', new MainMenu(this.engine, this.dungeonService));
    this.engine.add('gamescreen', new GameScreen(this.engine, this.dungeonService));
  }

  public start() {
    console.log('starting game');
    const loader = this.getLoader();
    return this.engine.start(loader).then((data) => {
      console.log(data);
      this.engine.goToScene('mainmenu');
    },
    error => {
      console.log(error);
    });
  }

  public getLoader() {
    const loader = new Loader();

    for (const [key, loadable] of Object.entries(this.dungeonService.resources)) {
      loader.addResource(loadable);
    }

    return loader;
  }

}
