import { Scene, Engine, Events } from 'excalibur';
import { DungeonGame } from './dungeon-game';

export class GameScreen extends Scene {
  dungeonEngine: DungeonGame;

  onInitialize(engine: Engine) {
    this.dungeonEngine = engine as DungeonGame;
    engine.input.pointers.on('wheel', ev => {
      console.log(ev.deltaX);
    });
    const rooms = this.dungeonEngine.dungeonService.gameData.dungeonRooms;

    for (const room of rooms) {
      const actor = room.getTile();
      this.add(actor);
    }

  }

  onActivate() {}

  onDeactivate() {}
}
