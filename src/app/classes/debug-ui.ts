import { UIActor, Vector, Color, Engine, Label, FontUnit, FontStyle } from 'excalibur';
import { GameScreen } from './game-screen';

export class DebugUI extends UIActor {
  fontSize = 20;
  fontColor = Color.White;
  currentSpot: Label;
  canvasSize: Label;
  gameSize: Label;
  zoomLevel: Label;

  gameScreen: GameScreen;

  constructor(gameScreen: GameScreen) {
    super({
      pos: new Vector(0, 0),
      width: 500,
      height: 500
    });
    this.gameScreen = gameScreen;
  }

  onInitialize(engine: Engine) {
    this.currentSpot = this.constructLabel(`Current Spot = ${engine.currentScene.camera.pos.x}:${engine.currentScene.camera.pos.y}`, 1);

    this.canvasSize = this.constructLabel(`Canvas Size = ${engine.canvasWidth}x${engine.canvasHeight}`, 2);

    this.gameSize = this.constructLabel(
      `Game Size = ${this.gameScreen.currentFloor.pageWidth}x${this.gameScreen.currentFloor.pageHeight}`,
      3);

    this.zoomLevel = this.constructLabel(`Zoom Level = ${this.gameScreen.currentZoom}`, 4);

    this.add(this.currentSpot);
    this.add(this.canvasSize);
    this.add(this.gameSize);
    this.add(this.zoomLevel);
  }

  onPreUpdate(engine: Engine, delta: number) {
    this.currentSpot.text = `Current Spot = ${engine.currentScene.camera.pos.x}:${engine.currentScene.camera.pos.y}`;
    this.canvasSize.text = `Canvas Size = ${engine.canvasWidth}x${engine.canvasHeight}`;
    this.gameSize.text = `Game Size = ${this.gameScreen.currentFloor.pageWidth}x${this.gameScreen.currentFloor.pageHeight}`;
    this.zoomLevel.text = `Zoom Level = ${this.gameScreen.currentZoom}`;
  }

  constructLabel(labelText: string, index: number): Label {
    return new Label({
      text: labelText,
      x: 10,
      y: this.fontSize * index,
      fontFamily: 'Arial',
      fontSize: this.fontSize,
      fontUnit: FontUnit.Px,
      bold: true,
      color: this.fontColor
    });
  }
}
