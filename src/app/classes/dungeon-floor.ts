import { TileMap, SpriteSheet, Engine } from 'excalibur';
import { DungeonRoom, DungeonTile } from './dungeon-room';
import { DungeonService } from '../services/dungeon.service';
import { JsonConvertable } from './json-convertable';

export class DungeonFloor extends JsonConvertable {
  dungeonRooms: DungeonRoom[];
  width = 201;
  height = 201;
  center: number;

  constructor() {
    super();
    this.center = (Math.floor(this.width / 2) * this.height) + Math.round(this.height / 2);
  }

  getTileFloor(service: DungeonService) {
    return new DungeonTileFloor(this, service);
  }

  getCenter() {
    return this.center;
  }
}

export class DungeonTileFloor extends TileMap {
  floor: DungeonFloor;
  service: DungeonService;
  timeDelta = 0;
  width: number;
  height: number;
  pageWidth: number;
  pageHeight: number;
  dungeonRooms: DungeonTile[] = [];

  constructor(floor: DungeonFloor, service: DungeonService) {
    super({
      x: 0,
      y: 0,
      cols: floor.width,
      rows: floor.height,
      cellWidth: DungeonTile.width,
      cellHeight: DungeonTile.height
    });
    this.floor = floor;
    this.service = service;
    this.width = floor.width;
    this.height = floor.height;
    this.pageWidth = floor.width * DungeonTile.width;
    this.pageHeight = floor.height * DungeonTile.height;
    this.service.resources.TileSheets.forEach(sheet => {
      this.registerSpriteSheet(sheet.id.toString(),
      new SpriteSheet(sheet.texture, sheet.columns, sheet.rows, DungeonTile.width, DungeonTile.height));
    });
    this.floor.dungeonRooms.forEach(room => {
      this.dungeonRooms.push(room.getTile(this));
    });
  }

  intialize() {
    this.dungeonRooms.forEach(room => {
      room.initialize();
      room.update(false);
    });
  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);
  }

  getCenter() {
    return this.floor.getCenter();
  }

  getCenterTile() {
    return this.dungeonRooms[this.getCenter()];
  }

  getCenterRoom() {
    return this.floor.dungeonRooms[this.getCenter()];
  }

  getRoom(x: number, y: number) {
    if (x < this.width && x > -1 && y < this.height && y > -1) {
      return this.dungeonRooms[x + (y * this.height)];
    }
    return null;
  }
}
