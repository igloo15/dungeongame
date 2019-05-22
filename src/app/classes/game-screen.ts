import { Scene, Engine, Events } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon-service.service';

export class GameScreen extends Scene {
  dungeonService: DungeonService;

  constructor(engine: Engine, service: DungeonService) {
    super(engine);
    this.dungeonService = service;
  }

  onInitialize(engine: Engine) {
    engine.input.pointers.on('wheel', ev => {
      console.log(ev.deltaX);
    });
    const rooms = this.dungeonService.gameData.dungeonRooms;

    for (const room of rooms) {
      const actor = room.getTile(this.dungeonService);
      this.add(actor);
    }

  }

  onActivate() {}

  onDeactivate() {}
}
