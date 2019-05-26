import { Scene, Engine, Events, Vector, GameEvent, Actor, Input } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon.service';
import { DungeonFloor, DungeonTileFloor } from './dungeon-floor';
import { DungeonTile } from './dungeon-room';
import { DebugUI } from './debug-ui';

export class GameScreen extends Scene {
  dungeonService: DungeonService;
  previousMouseSpot: Vector;
  currentZoom = 1.0;
  currentFloor: DungeonTileFloor;
  boundingEasing = DungeonTile.width;
  notDragging = true;

  constructor(engine: Engine, service: DungeonService) {
    super(engine);
    this.dungeonService = service;
  }

  onInitialize(engine: Engine) {
    this.setupZooming(engine);
    this.setupMouseClicking(engine);
    this.currentFloor = this.dungeonService.gameData.dungeonFloors[0].getTileFloor(this.dungeonService);

    this.currentFloor.intialize();

    this.addTileMap(this.currentFloor);
    this.add(new DebugUI(this));
    this.dumpInfo(engine);
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

  dumpInfo(engine: Engine) {

  }

  updateDragging(engine: Engine) {
    if (engine.input.pointers.primary.isDragging) {
      if (this.previousMouseSpot) {
        this.camera.move(this.getDragVector(engine), 0);
      }
      console.log('dragging');
      this.previousMouseSpot = engine.input.pointers.primary.lastPagePos;
    }

    if (engine.input.pointers.primary.isDragEnd) {
      this.previousMouseSpot = null;
      if (!this.notDragging) {
        this.notDragging = true;
      }
    }
  }

  getDragVector(engine: Engine) {
    const deltaX = (engine.input.pointers.primary.lastPagePos.x - this.previousMouseSpot.x) / this.currentZoom;
    const deltaY = (engine.input.pointers.primary.lastPagePos.y - this.previousMouseSpot.y) / this.currentZoom;
    if (deltaX > 0 || deltaY > 0) {
      this.notDragging = false;
    }
    const x = this.getDrag(this.currentFloor.pageWidth, engine.canvasWidth / 2, deltaX, this.camera.pos.x);
    const y = this.getDrag(this.currentFloor.pageHeight, engine.canvasHeight / 2, deltaY, this.camera.pos.y);
    return new Vector(x, y);
  }

  getDrag(pageSize: number, canvasSize: number, delta: number, current: number) {
    const max = (pageSize - (canvasSize / this.currentZoom) + this.boundingEasing);
    const min = (canvasSize / this.currentZoom) - this.boundingEasing;
    let newCurrent = current - delta;
    newCurrent = Math.min(newCurrent, max);
    newCurrent = Math.max(newCurrent, min);
    return newCurrent;
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

  setupMouseClicking(engine: Engine) {
    engine.input.pointers.primary.on('up', (ev: Input.PointerEvent) => {
      if (this.notDragging) {
        console.log('not dragging');
        const x = Math.floor(ev.worldPos.x / DungeonTile.width);
        const y = Math.floor(ev.worldPos.y / DungeonTile.height);

        const foundRoom = this.currentFloor.floor.getRoom(x, y);
        console.log(foundRoom);
      }
    });
  }
}
