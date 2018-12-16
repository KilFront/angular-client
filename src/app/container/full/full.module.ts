import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FullComponent } from "./full.component";

import { fullRoutes } from "./full.routes";

@NgModule({
  imports: [
    RouterModule.forChild(fullRoutes)
  ],
  exports: [],
  declarations: [
    FullComponent
  ],
  providers: []
})

export class FullModule { }
