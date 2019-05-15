import * as ex from 'excalibur';
import { MainMenu } from './mainmenu';


export class DungeonGame extends ex.Engine {
  constructor() {
    super({
      canvasElementId: 'game',
      displayMode: ex.DisplayMode.Container,
      pointerScope: ex.Input.PointerScope.Canvas
    });
  }

  public initialize() {
    this.add('mainmenu', new MainMenu(this));
  }

  public start() {
    console.log('starting game');

    return super.start().then(() => {
      this.goToScene('mainmenu');
    });
  }

}
