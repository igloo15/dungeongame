
import { Vector, UIActor, Color } from 'excalibur';

export class DungeonRoom {
  x: number;
  y: number;
  width = 100;
  height = 100;
  isDug: boolean;

  constructor(x: number, y: number, isDug: boolean = false) {
    this.x = x;
    this.y = y;
    this.isDug = isDug;
  }

  getVector(): Vector {
    return new Vector(100 + (this.x * this.width), this.y * this.height);
  }

  getActor(): UIActor {
    return new UIActor({
      pos: this.getVector(),
      color: this.isDug ? Color.Green : Color.Red,
      width: this.width,
      height: this.height
    });
  }

}
