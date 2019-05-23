import { DungeonRoom } from './dungeon-room';

export class DungeonGameData {
  dungeonName: string;
  dungeonRooms: DungeonRoom[];

  constructor(name: string) {
    this.dungeonName = name;
    this.dungeonRooms = [];
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 21; j++) {
        this.dungeonRooms.push(new DungeonRoom(i, j));
      }
    }
    this.dungeonRooms[221].isDug = true;
  }
}
