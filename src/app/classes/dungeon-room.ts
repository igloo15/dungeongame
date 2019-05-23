
import { Vector, Actor, Color, Engine, Sprite } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon.service';



export class DungeonRoom {
  x: number;
  y: number;
  isDug: boolean;
  isExplored = false;

  constructor(x: number, y: number, isDug: boolean = false) {
    this.x = x;
    this.y = y;
    this.isDug = isDug;
  }

  getTile(service: DungeonService): DungeonTile {
    return new DungeonTile(this, service);
  }

  getPos(): Vector {
    return new Vector((this.x * DungeonTile.width), this.y * DungeonTile.height);
  }

}

export class DungeonTile extends Actor {
  static width = 64;
  static height = 64;
  room: DungeonRoom;
  northRoom: DungeonRoom;
  southRoom: DungeonRoom;
  eastRoom: DungeonRoom;
  westRoom: DungeonRoom;
  service: DungeonService;

  constructor(room: DungeonRoom, service: DungeonService) {
    super({
      pos: new Vector(100 + (room.x * DungeonTile.width), room.y * DungeonTile.height),
      width: DungeonTile.width,
      height: DungeonTile.height
    });
    this.room = room;
    this.service = service;
    this.enableCapturePointer = true;
    this.on('pointerup', ev => {
      this.room.isDug = true;
    });
  }

  onInitialize(engine: Engine) {
    for (const [key, texture] of Object.entries(this.service.resources)) {

      this.addDrawing(key, new Sprite(texture, 0, 0, 64, 64));
    }
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
      if (this.northRoom.isDug) {
        textureName += 'n';
      }
      if (this.southRoom.isDug) {
        textureName += 's';
      }
      if (this.westRoom.isDug) {
        textureName += 'w';
      }
      if (this.eastRoom.isDug) {
        textureName += 'e';
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
