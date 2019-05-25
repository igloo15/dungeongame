
import { Vector, Actor, Color, Engine, Sprite, TileSprite } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon.service';
import { JsonConvertable } from './json-convertable';



export class DungeonRoom extends JsonConvertable {
  private tile: DungeonTile;
  public x: number;
  public y: number;
  public isDug: boolean;
  public sheetId = '0';

  constructor(x: number, y: number, isDug: boolean = false) {
    super();
    this.x = x;
    this.y = y;
    this.isDug = isDug;
  }

  getTile(service: DungeonService): DungeonTile {
    if (!this.tile) {
      this.tile = new DungeonTile(this, service);
    }
    return this.tile;
  }

  getPos(): Vector {
    return new Vector((this.x * DungeonTile.width), this.y * DungeonTile.height);
  }

  update() {
    this.tile.update();
  }
}

export class DungeonTile extends TileSprite {
  static width = 64;
  static height = 64;
  room: DungeonRoom;
  northRoom: DungeonRoom;
  southRoom: DungeonRoom;
  eastRoom: DungeonRoom;
  westRoom: DungeonRoom;
  service: DungeonService;

  constructor(room: DungeonRoom, service: DungeonService) {
    super(room.sheetId, 0);
    this.room = room;
    this.service = service;
  }

  update() {
    this.spriteId = Math.floor(Math.random() * Math.floor(18));
  }

  updateTexture() {
  }
}
