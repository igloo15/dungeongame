import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule],
})
export class DungeonMaterialModule { }
