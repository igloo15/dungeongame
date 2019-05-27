import { Texture, Loader } from 'excalibur';

export class Resources {

  LocalImages: TexturePair[];
  TileSheets: IMapTileSheet[];
  constructor() {
    this.LocalImages = [
    ];
    this.TileSheets = [
      {
        id: 0,
        texture: new Texture(require('../../assets/DungeonTileSheet.png')),
        columns: 8,
        rows: 5,
        keyValues: this.createTilePairs(['uNSWE', 'uN', 'uS', 'uW', 'uE', 'uNS', 'uWE',
        'uNW', 'uNE', 'uSW', 'uSE', 'uSWE', 'uNWE', 'uNSE', 'uNSW', 'd', 'dN', 'dS',
        'dW', 'dE', 'dNS', 'dWE', 'dNW', 'dNE', 'dSW', 'dSE', 'dSWE', 'dNWE', 'dNSE',
        'dNSW', 'dNSWE', 'u', 'white'])
      }
    ];
  }

  load(loader: Loader) {
    this.LocalImages.forEach(img => {
      loader.addResource(img.texture);
    });

    this.TileSheets.forEach(sheet => {
      loader.addResource(sheet.texture);
    });
  }

  createTilePairs(keys: string[]) {
    const tilePairs: TilePair[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keys.length; i++) {
      tilePairs.push(new TilePair(keys[i], i));
    }
    return tilePairs;
  }

  getSpriteId(sheetId: number, key: string) {
    for (const tilePair of this.TileSheets[sheetId].keyValues) {
      if (tilePair.key === key) {
        return tilePair.value;
      }
    }
    return 0;
  }
}

export class TexturePair {
  key: string;
  texture: Texture;

  constructor(key: string, tex: string) {
    this.key = key;
    this.texture = new Texture(tex);
  }
}

export interface IMapTileSheet {
  id: number;
  texture: Texture;
  columns: number;
  rows: number;
  keyValues: TilePair[];
}

export class TilePair {
  key: string;
  value: number;

  constructor(key: string, value: number) {
    this.key = key;
    this.value = value;
  }
}
