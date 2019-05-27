import { DungeonRoom } from './dungeon-room';
import { DungeonFloor } from './dungeon-floor';
import { JsonConvertable } from './json-convertable';

export class DungeonGameData extends JsonConvertable {
  dungeonName: string;
  dungeonFloors: DungeonFloor[];

  constructor(name: string) {
    super();
    this.dungeonName = name;
    this.dungeonFloors = [];
    const floor = new DungeonFloor();
    this.dungeonFloors.push(floor);

    floor.dungeonRooms = [];
    for (let i = 0; i < floor.width; i++) {
      for (let j = 0; j < floor.height; j++) {
        floor.dungeonRooms.push(new DungeonRoom(j, i));
      }
    }
    floor.dungeonRooms[floor.center].isDug = true;
  }
}
