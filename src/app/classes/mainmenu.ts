
import { UIActor, Scene, Engine, Color, Label, Vector, FontUnit, TextAlign, Events } from 'excalibur';
import { LocalStorageService } from 'angular-2-local-storage';
import { DungeonService } from '../services/dungeon-service.service';
import { DungeonGame } from './dungeon-game';

export class MainMenu extends Scene {

  dungeonService: DungeonService;

  constructor(engine: Engine, service: DungeonService) {
    super(engine);
    this.dungeonService = service;
  }

  public onInitialize(engine: Engine) {
    const menuActor = new UIActor({
      pos: new Vector(10, 10),
      width: 400,
      height: 600,
      color: Color.DarkGray
    });
    const backgroundMenuActor = new UIActor({
      pos: new Vector(engine.halfCanvasWidth - 210, engine.halfCanvasHeight - 310),
      width: 420,
      height: 620,
      color: Color.Gray
    });

    const newButton = new UIActor({
      pos: new Vector(20, 60),
      width: 360,
      height: 120,
      color: Color.Red
    });
    newButton.enableCapturePointer = true;
    newButton.on('pointerup', (ev) => {
      this.dungeonService.newGame();
      engine.goToScene('gamescreen');
    });

    const loadButton = new UIActor({
      pos: new Vector(20, 220),
      width: 360,
      height: 120,
      color: Color.Red
    });
    loadButton.enableCapturePointer = true;
    loadButton.on('pointerup', (ev) => {
      this.dungeonService.loadGame();
      engine.goToScene('gamescreen');
    });

    const newTitle = new Label({
      pos: new Vector(170, 72),
      text: 'New',
      fontSize: 20,
      fontUnit: FontUnit.Pt,
      fontFamily: 'Arial, Sans-Serif',
      color: Color.Black,
      textAlign: TextAlign.Center
    });
    const loadTitle = new Label({
      pos: new Vector(170, 72),
      text: 'Load',
      fontSize: 20,
      fontUnit: FontUnit.Pt,
      fontFamily: 'Arial, Sans-Serif',
      color: Color.Black,
      textAlign: TextAlign.Center
    });
    // newTitle.z = 1;
    newButton.add(newTitle);
    loadButton.add(loadTitle);
    menuActor.add(newButton);
    menuActor.add(loadButton);
    backgroundMenuActor.add(menuActor);
    this.add(backgroundMenuActor);

  }
  public onActivate() {}
  public onDeactivate() {}
}
