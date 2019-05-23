import { Scene, Engine, Events, Vector, GameEvent, Actor, Input } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon.service';

export class GameScreen extends Scene {
  dungeonService: DungeonService;
  previousMouseSpot: Vector;
  currentZoom = 1.0;

  constructor(engine: Engine, service: DungeonService) {
    super(engine);
    this.dungeonService = service;
  }

  onInitialize(engine: Engine) {
    engine.input.pointers.primary.on('wheel', (ev: Input.WheelEvent) => {
      const zoomFactor = ev.deltaY / 1000;
      const newZoom = this.currentZoom - zoomFactor;
      if (newZoom > 0.5 && newZoom < 2.5) {
        this.camera.zoom((this.currentZoom -= zoomFactor), 0);
      }
      console.log(zoomFactor + ':' + this.currentZoom);
    });
    const rooms = this.dungeonService.gameData.dungeonRooms;

    for (const room of rooms) {
      const actor = room.getTile(this.dungeonService);
      this.add(actor);
    }


  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    if (engine.input.pointers.primary.isDragging) {
      if (this.previousMouseSpot) {
        const deltaX = (engine.input.pointers.primary.lastPagePos.x - this.previousMouseSpot.x) / this.currentZoom;
        const deltaY = (engine.input.pointers.primary.lastPagePos.y - this.previousMouseSpot.y) / this.currentZoom;
        const cameraSpot = this.camera.pos;
        this.camera.move(new Vector(cameraSpot.x - deltaX, cameraSpot.y - deltaY), 0);
      }
      this.previousMouseSpot = engine.input.pointers.primary.lastPagePos;
    }

    if (engine.input.pointers.primary.isDragEnd) {
      this.previousMouseSpot = null;
    }
  }

  onActivate() {
    this.camera.move(new Vector(0, 0), 0);
  }

  onDeactivate() {}
}
