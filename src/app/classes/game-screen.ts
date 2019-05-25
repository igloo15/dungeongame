import { Scene, Engine, Events, Vector, GameEvent, Actor, Input } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon.service';
import { DungeonFloor, DungeonTileFloor } from './dungeon-floor';
import { DungeonTile } from './dungeon-room';

export class GameScreen extends Scene {
  dungeonService: DungeonService;
  previousMouseSpot: Vector;
  currentZoom = 1.0;
  currentFloor: DungeonTileFloor;

  constructor(engine: Engine, service: DungeonService) {
    super(engine);
    this.dungeonService = service;
  }

  onInitialize(engine: Engine) {
    this.setupZooming(engine);
    this.currentFloor = this.dungeonService.gameData.dungeonFloors[0].getTileFloor(this.dungeonService);

    this.currentFloor.intialize();

    this.addTileMap(this.currentFloor);
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    this.updateDragging(engine);
  }

  onActivate() {
    console.log(this.currentFloor.floor.getCenter());
    this.camera.move(this.currentFloor.floor.getCenterRoom().getPos(), 0);
  }

  onDeactivate() {}

  updateDragging(engine: Engine) {
    if (engine.input.pointers.primary.isDragging) {
      if (this.previousMouseSpot) {
        const deltaX = (engine.input.pointers.primary.lastPagePos.x - this.previousMouseSpot.x) / this.currentZoom;
        const deltaY = (engine.input.pointers.primary.lastPagePos.y - this.previousMouseSpot.y) / this.currentZoom;
        const cameraSpot = this.camera.pos;
        const newCameraSpot = new Vector(cameraSpot.x - deltaX, cameraSpot.y - deltaY);
        if (newCameraSpot.x > (engine.canvasWidth) && newCameraSpot.x < (this.currentFloor.pageWidth - engine.canvasWidth) &&
          newCameraSpot.y > engine.canvasHeight && newCameraSpot.y < (this.currentFloor.pageHeight - engine.canvasHeight)) {
          this.camera.move(newCameraSpot, 0);
        }
      }
      this.previousMouseSpot = engine.input.pointers.primary.lastPagePos;
    }

    if (engine.input.pointers.primary.isDragEnd) {
      this.previousMouseSpot = null;
    }
  }

  setupZooming(engine: Engine) {
    engine.input.pointers.primary.on('wheel', (ev: Input.WheelEvent) => {
      const zoomFactor = ev.deltaY / 1000;
      const newZoom = this.currentZoom - zoomFactor;
      if (newZoom > 0.5 && newZoom < 2.5) {
        this.camera.zoom((this.currentZoom -= zoomFactor), 0);
      }
      console.log(zoomFactor + ':' + this.currentZoom);
    });
  }
}
