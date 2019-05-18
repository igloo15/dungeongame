import { DungeonRoom } from './dungeon-room';

export class DungeonGameData {
  dungeonName: string;
  dungeonRooms: DungeonRoom[];

  constructor(name: string) {
    this.dungeonName = name;
    this.dungeonRooms = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        this.dungeonRooms.push(new DungeonRoom(i, j));
      }
    }
    this.dungeonRooms[0].isDug = true;
  }
}
