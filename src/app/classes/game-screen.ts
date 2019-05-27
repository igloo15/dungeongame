import { Scene, Engine, Events, Vector, GameEvent, Actor, Input, Color } from 'excalibur';
import { DungeonGame } from './dungeon-game';
import { DungeonService } from '../services/dungeon.service';
import { DungeonFloor, DungeonTileFloor } from './dungeon-floor';
import { DungeonTile } from './dungeon-room';
import { DebugUI } from './ui/debug-ui';
import { KeyEvent } from 'excalibur/dist/Input';

export class GameScreen extends Scene {
  dungeonService: DungeonService;
  previousMouseSpot: Vector;
  currentZoom = 1.0;
  currentFloor: DungeonTileFloor;
  boundingEasing = DungeonTile.width;
  dragThreshold = 10;
  notDragging = true;
  debugUI: DebugUI;

  constructor(engine: Engine, service: DungeonService) {
    super(engine);
    this.dungeonService = service;
  }

  onInitialize(engine: Engine) {
    this.setupZooming(engine);
    this.setupMouseClicking(engine);
    this.setupKeyboard(engine);
    this.currentFloor = this.dungeonService.gameData.dungeonFloors[0].getTileFloor(this.dungeonService);

    this.currentFloor.intialize();
    this.addTileMap(this.currentFloor);

    // this.add(new DebugUI(this));
    this.dumpInfo(engine);
  }

  update(engine: Engine, delta: number) {
    super.update(engine, delta);

    this.updateDragging(engine);
  }

  onActivate() {
    this.camera.move(this.currentFloor.getCenterTile().getPos(), 0);
  }

  onDeactivate() {}

  dumpInfo(engine: Engine) {

  }

  updateDragging(engine: Engine) {
    if (engine.input.pointers.primary.isDragging) {
      if (this.previousMouseSpot) {
        const newCameraSpot = this.getDragVector(engine);
        if (newCameraSpot) {
          this.camera.move(newCameraSpot, 0);
          this.previousMouseSpot = engine.input.pointers.primary.lastPagePos;
        }
      } else {
        this.previousMouseSpot = engine.input.pointers.primary.lastPagePos;
      }
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
    if (!(Math.abs(deltaX) > this.dragThreshold || Math.abs(deltaY) > this.dragThreshold)) {
      return null;
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

    });
  }

  setupMouseClicking(engine: Engine) {
    engine.input.pointers.primary.on('up', (ev: Input.PointerEvent) => {
      if (this.notDragging) {

        const x = Math.floor(ev.worldPos.x / DungeonTile.width);
        const y = Math.floor(ev.worldPos.y / DungeonTile.height);

        const foundRoom = this.currentFloor.getRoom(x, y);
        this.onClick(foundRoom);
      }
    });
  }

  setupKeyboard(engine: Engine) {
    engine.input.keyboard.on('release', (ev: KeyEvent) => {
      if (ev.key === Input.Keys.D) {
        if (this.debugUI) {
          this.remove(this.debugUI);
          this.debugUI = null;
        } else {
          this.debugUI = new DebugUI(this);
          this.add(this.debugUI);
        }
      }
    });
  }

  onClick(room: DungeonTile) {
    room.dig();
  }
}
