import { TileMap, SpriteSheet, Engine } from 'excalibur';
import { DungeonRoom, DungeonTile } from './dungeon-room';
import { DungeonService } from '../services/dungeon.service';
import { JsonConvertable } from './json-convertable';

export class DungeonFloor extends JsonConvertable {
  dungeonRooms: DungeonRoom[];
  width = 201;
  height = 201;

  getTileFloor(service: DungeonService) {
    return new DungeonTileFloor(this, service);
  }

  getCenter() {
    return (Math.floor(this.width / 2) * this.height) + Math.round(this.height / 2);
  }

  getCenterRoom() {
    return this.dungeonRooms[this.getCenter()];
  }

  getRoom(x: number, y: number) {
    if (x < this.width && y < this.height) {
      return this.dungeonRooms[x + (y * this.height)];
    }
    return null;
  }
}

export class DungeonTileFloor extends TileMap {
  floor: DungeonFloor;
  service: DungeonService;
  timeDelta = 0;
  pageWidth: number;
  pageHeight: number;

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
    this.pageWidth = floor.width * DungeonTile.width;
    this.pageHeight = floor.height * DungeonTile.height;
  }

  intialize() {
    this.service.resources.TileSheets.forEach(sheet => {
      this.registerSpriteSheet(sheet.id.toString(),
      new SpriteSheet(sheet.texture, sheet.columns, sheet.rows, DungeonTile.width, DungeonTile.height));
    });
    this.floor.dungeonRooms.forEach(room => {
      this.getCell(room.x, room.y).pushSprite(room.getTile(this.service));
    });
  }


  update(engine: Engine, delta: number) {
    super.update(engine, delta);
    this.timeDelta += delta;
    if (this.timeDelta % 500 === 0) {
      this.timeDelta = 0;
      this.floor.dungeonRooms.forEach(room => {
        room.update();
      });
    }
  }
}
