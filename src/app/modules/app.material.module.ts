import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
  MatIconModule, MatDividerModule, MatMenuModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatDividerModule, MatMenuModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatDividerModule, MatMenuModule],
})
export class DungeonMaterialModule { }
