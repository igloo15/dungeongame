
import { Vector, UIActor, Color, Engine, Sprite } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { text } from '@angular/core/src/render3';

export class DungeonRoom {
  x: number;
  y: number;
  isDug: boolean;
  isExplored = false;
  northOpen = false;
  southOpen = false;
  westOpen = false;
  eastOpen = false;

  constructor(x: number, y: number, isDug: boolean = false) {
    this.x = x;
    this.y = y;
    this.isDug = isDug;
  }

  getTile(): DungeonTile {
    return new DungeonTile(this);
  }

}

export class DungeonTile extends UIActor {
  static width = 64;
  static height = 64;
  room: DungeonRoom;

  constructor(room: DungeonRoom) {
    super({
      pos: new Vector(100 + (room.x * DungeonTile.width), room.y * DungeonTile.height),
      width: DungeonTile.width,
      height: DungeonTile.height
    });
    this.room = room;
    this.enableCapturePointer = true;
    this.on('pointerup', ev => {
      this.room.isDug = true;
    });
  }

  onInitialize(engine: Engine) {
    const dungeonEngine = engine as DungeonGame;
    for (const [key, texture] of Object.entries(dungeonEngine.resources)) {

      this.addDrawing(key, new Sprite(texture, 0, 0, 64, 64));
    }
  }

  getVector(): Vector {
    return new Vector((this.x * DungeonTile.width), this.y * DungeonTile.height);
  }

  public update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.updateTexture();
  }

  updateTexture() {
    if (!this.room.isExplored) {
      this.color = Color.Gray;
    } else if (this.room.isDug) {
      let textureName = '';
      if (this.room.northOpen) {
        textureName += 'N_';
      }
      if (this.room.southOpen) {
        textureName += 'S_';
      }
      if (this.room.westOpen) {
        textureName += 'W_';
      }
      if (this.room.eastOpen) {
        textureName += 'E_';
      }
      if (textureName) {
        textureName += 'Open';
      } else {
        textureName = 'Closed';
      }
      this.setDrawing(textureName);
    }
  }
}
