
import { Engine, DisplayMode, Input, Loader, Texture, Debug, Color } from 'excalibur';
import { MainMenu } from './ui/mainmenu';
import { DungeonService } from '../services/dungeon.service';
import { GameScreen } from './game-screen';

export class DungeonGame {
  dungeonService: DungeonService;
  engine: Engine;

  constructor(dungeonService: DungeonService) {
    this.engine = new Engine({
      canvasElementId: 'game',
      displayMode: DisplayMode.Container,
      pointerScope: Input.PointerScope.Canvas,
      suppressPlayButton: true,
      backgroundColor: Color.Black
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
      this.engine.goToScene('mainmenu');
    },
    error => {
      console.log(error);
    });
  }

  public getLoader() {
    const loader = new Loader();

    this.dungeonService.resources.load(loader);

    return loader;
  }

}
