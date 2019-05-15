import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule],
})
export class DungeonMaterialModule { }
