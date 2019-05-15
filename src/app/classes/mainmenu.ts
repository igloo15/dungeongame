
import * as ex from 'excalibur';
import { UIActor } from 'excalibur';

export class MainMenu extends ex.Scene {
  public onInitialize(engine: ex.Engine) {
    const menuActor = new UIActor(10, 10, 800, 800);
    const titleLabel = new ex.Label('Whatever', 600, 600);
    titleLabel.color = ex.Color.Red;
    titleLabel.scale = new ex.Vector(15, 15);
    this.add(titleLabel);
    this.add(menuActor);
  }
  public onActivate() {}
  public onDeactivate() {}
}
