import { Texture, Loader } from 'excalibur';

export class Resources {

  LocalImages: TexturePair[];
  TileSheets: IMapTileSheet[];
  constructor() {
    this.LocalImages = [
      new TexturePair('closed', require('../../assets/ClosedRoom.png')),
    ];
    this.TileSheets = [
      {
        id: 0,
        texture: new Texture(require('../../assets/DungeonTileSheet.png')),
        columns: 10,
        rows: 2
      }
    ];
  }

    Closed = new Texture(require('../../assets/ClosedRoom.png'));
    nOpen = new Texture(require('../../assets/N_OpenRoom.png'));
    nsOpen = new Texture(require('../../assets/N_S_OpenRoom.png'));
    nswOpen = new Texture(require('../../assets/N_S_W_OpenRoom.png'));
    nsweOpen = new Texture(require('../../assets/N_S_W_E_OpenRoom.png'));
    nweOpen = new Texture(require('../../assets/N_W_E_OpenRoom.png'));
    nwOpen = new Texture(require('../../assets/N_W_OpenRoom.png'));
    neOpen = new Texture(require('../../assets/N_E_OpenRoom.png'));
    swOpen = new Texture(require('../../assets/S_W_OpenRoom.png'));
    seOpen = new Texture(require('../../assets/S_E_OpenRoom.png'));
    sweOpen = new Texture(require('../../assets/S_W_E_OpenRoom.png'));
    weOpen = new Texture(require('../../assets/W_E_OpenRoom.png'));
    wOpen = new Texture(require('../../assets/W_OpenRoom.png'));
    eOpen = new Texture(require('../../assets/E_OpenRoom.png'));


  load(loader: Loader) {
    this.LocalImages.forEach(img => {
      loader.addResource(img.texture);
    });

    this.TileSheets.forEach(sheet => {
      loader.addResource(sheet.texture);
    });
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
}
