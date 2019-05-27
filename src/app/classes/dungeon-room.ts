
import { Vector, Actor, Color, Engine, Sprite, TileSprite, TileMap, Cell } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon.service';
import { JsonConvertable } from './json-convertable';
import { DungeonTileFloor } from './dungeon-floor';



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
}

export class DungeonTile extends TileSprite {
  static width = 64;
  static height = 64;

  private room: DungeonRoom;
  private pos: Vector;
  private cell: Cell;
  private spriteIdString: string;

  map: DungeonTileFloor;
  northRoom: DungeonTile;
  southRoom: DungeonTile;
  eastRoom: DungeonTile;
  westRoom: DungeonTile;

  constructor(room: DungeonRoom, map: DungeonTileFloor) {
    super(room.sheetId, 31);
    this.room = room;
    this.map = map;
    this.pos = new Vector(this.room.x * DungeonTile.width, this.room.y * DungeonTile.height);
    this.cell = map.getCell(room.x, room.y);
  }

  update(propagate: boolean) {
    this.spriteId = this.getSpriteId();
    if (propagate) {
      this.updateRoom(false, this.northRoom);
      this.updateRoom(false, this.southRoom);
      this.updateRoom(false, this.westRoom);
      this.updateRoom(false, this.eastRoom);
    }
    // this.spriteId = Math.floor(Math.random() * Math.floor(18));
  }

  updateTexture() {
  }

  initialize() {
    this.getCell().pushSprite(new TileSprite('0', 32));
    this.getCell().pushSprite(this);
    this.westRoom = this.map.getRoom(this.room.x - 1, this.room.y);
    this.eastRoom = this.map.getRoom(this.room.x + 1, this.room.y);
    this.northRoom = this.map.getRoom(this.room.x, this.room.y - 1);
    this.southRoom = this.map.getRoom(this.room.x, this.room.y + 1);
  }

  getCell() {
    return this.cell;
  }

  getPos(): Vector {
    return this.pos;
  }

  dig() {
    if (this.room.isDug || !this.attachedDug()) {
      return;
    }
    this.room.isDug = true;
    this.update(true);
  }

  isDug() {
    return this.room.isDug;
  }

  anyDug() {
    return this.room.isDug || this.attachedDug();
  }

  attachedDug() {
    return this.checkDug(this.northRoom) || this.checkDug(this.southRoom) || this.checkDug(this.westRoom) || this.checkDug(this.eastRoom);
  }

  getSpriteId() {
    let spriteKey = '';
    if (this.isDug()) {
      spriteKey += 'd';
    } else {
      spriteKey += 'u';
    }

    if (this.checkDug(this.northRoom)) {
      spriteKey += 'N';
    }

    if (this.checkDug(this.southRoom)) {
      spriteKey += 'S';
    }

    if (this.checkDug(this.westRoom)) {
      spriteKey += 'W';
    }

    if (this.checkDug(this.eastRoom)) {
      spriteKey += 'E';
    }
    this.spriteIdString = spriteKey;
    return this.map.service.resources.getSpriteId(0, spriteKey);
  }

  checkDug(room?: DungeonTile) {
    return room ? room.isDug() : false;
  }

  checkAnyDug(room?: DungeonTile) {
    return room ? room.anyDug() : false;
  }

  updateRoom(propagate: boolean, room?: DungeonTile) {
    if (room) {
      room.update(propagate);
    }
  }
}
